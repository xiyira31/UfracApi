const models = require("../../db/models");
const TASK_CODE = require("../../enums/TASK_CODE");
const RESPONSE_CODE = require("../../enums/RESPONSE_CODE");
const utils = require("../../utils/utils");

const DfnDetailsService = require("../dfnDetails");
const PumpingsServices = require("../pump");

const fs = require("fs");
const path = require("path");
const { dir } = require("console");
const iconv = require('iconv-lite'); 

const spawn = require("child_process").spawn;

class PlanDetailServices {
  constructor(fracutre, planDetail) {
    this._fracutre = fracutre;
    this._planDetail = planDetail;
    this._youngs = fracutre.youngs;
    this._poisson_ratio = fracutre.poisson_ratio;
    this._max_stress = fracutre.max_stress;
    this._min_stress = fracutre.min_stress;
    this._time_step = fracutre.time_step;
    this._frac_height = fracutre.frac_height;
  }

  async exec() {
    await this.init();
    await this.caling();
    this.initArgs();
    this.runMatlab();
    //return utils.responseString(RESPONSE_CODE.SUCCESS, "已开始计算！");
  }

  async init() {
    await this.initFloder(this._fracutre.id);
    await this.initWellSection();
    await this.initDfn();
    await this.initPumpingProgram();
  }

  async initWellSection() {
    let section = await models.proc_well_section_detail.findOne({
      where: {
        id: this._planDetail.well_section_detail,
      },
      include: [
        {
          model: models.proc_well_section_cluster,
          as: "clusters",
        },
      ],
    });
    this._clusterNum = section.clusters.length;
    this._start = section.start;
    this._end = section.end;
    let clusters = [];
    section.clusters.forEach((cluster) => {
      clusters.push(cluster.position);
    });
    this._clusters = clusters.join(",");
  }

  async initPumpingProgram() {
    let pumpings = await models.proc_pumping_program_detail.findAll({
      where: {
        pumping_program: this._planDetail.pumping_program,
      },
      order: ["period_no"],
    });
    let pumpingsService = new PumpingsServices(pumpings);
    let mostUsedFluid = pumpingsService.getUsedFluid();
    let fluid = await models.base_frac_fluid.findOne({
      where: {
        id_base_frac_fluid: mostUsedFluid,
      },
    });
    if (fluid === null) {
      throw "未知液体！";
    }
    this._k = fluid.frac_fluid_cons_index;
    this._n = fluid.frac_fluid_flow_index;
    this._closs = 1e-6;
    this._flowRate = pumpingsService._flowRate;
    this._proppantRate = pumpingsService._proppantRate;
    this._preTime = pumpingsService._preTime;
    this._suffTime = pumpingsService._suffTime;
  }

  async initDfn() {
    let wellPlan = await models.proc_well_plan.findOne({
      where: {
        id: this._planDetail.well_plan
      }
    })
    let details = await models.proc_well_dfn_detail.findAll({
      where: {
        well: wellPlan.well,
      },
    });
    let dfnDetail = new DfnDetailsService(details);
    await dfnDetail.createDfnFile(
      this._rootFloder,
      this._start,
      this._end
    );
  }

  initArgs() {
    this._sigma_H = this._max_stress * 10e6;
    this._sigma_h = this._min_stress * 10e6;
    this._E = this._youngs * 10e6;
    this._nu = this._poisson_ratio;
    this._Kfluid = this._k;
    this._Nfluid = this._n;
    this._CLoss = this._closs;
    this._Q0 = this._flowRate;
    this._H = this._frac_height;
    this._HfNum = this._clusterNum;
    this._DistFra = this._clusters;
    this._sectionStart = this._start;
    this._sectionEnd = this._end;
    this._DenArea = 0.0001;
    this._AziAngle = 30;
    this._AveLen = 10;
    this._cprop = this._proppantRate;
    this._Tpad = this._preTime;
    this._Tprop = this._suffTime;
    this._Dt = 1000;
    this._Dl = this._time_step;
    this._NFScope = 200;
    this._filedir = this._rootFloder;
  }

  async initFloder(id) {
    let dirPath = path.resolve(".", "fractureResults/", id.toString());
    let has = await fs.existsSync(dirPath);
    if(!has) {
      await fs.mkdirSync(dirPath);
    }
    this._rootFloder = dirPath;
  }

  runMatlab() {
    let pyPath = path.resolve('.','python', 'fracture.py');
    let args = [pyPath];
    args.push(this._sigma_H);
    args.push(this._sigma_h);
    args.push(this._E);
    args.push(this._nu);
    args.push(this._Kfluid);
    args.push(this._Nfluid);
    args.push(this._CLoss);
    args.push(this._Q0);
    args.push(this._H);
    args.push(this._HfNum);
    args.push(this._DistFra);
    args.push(this._sectionStart);
    args.push(this._sectionEnd);
    args.push(this._DenArea);
    args.push(this._AziAngle);
    args.push(this._AveLen);
    args.push(this._cprop);
    args.push(this._Tpad);
    args.push(this._Tprop);
    args.push(this._Dt);
    args.push(this._Dl);
    args.push(this._NFScope);
    args.push(this._filedir + '\\');
    console.log('python2' + args.join(' '))
    var process = spawn("python2", args);
    process.fracture = this;
    process.stdout.on('data', async function (data) {
      console.log(process.fracture)
      if(data) {
        await process.fracture.saveInfo();
      }
    });
    process.stderr.on('data', function (data) {
      console.log(data.toString('utf8'))
    });
    process.on('close', function(code) {
      console.log('close code:' + code);
    })
  }

  async saveInfo() {
    let files = await fs.readdirSync(this._rootFloder);
    for (let index = 0; index < files.length; index++) {
      const fileName = files[index];
      const filePath = path.join(this._rootFloder, fileName);
      const fileBuffer = await fs.readFileSync(filePath);
      const fileContent = iconv.decode(fileBuffer,'GBK')
      switch (fileName) {
        case "DFN.poly":
          this._fracutre.DFN = fileContent;
          break;
        case "frapres.txt":
          this._fracutre.frapres = fileContent;
          break;
        case "frawidth.txt":
          this._fracutre.fraWidth = fileContent;
          break;
        case "prop.txt":
          this._fracutre.prop = fileContent;
          break;
        case "stiarea.txt":
          let lines = fileContent.split('\r\n');
          let first = lines[1].split(" ");
          let area = first[0];
          let abilityArea = first[1];
          let percent = lines[3];
          this._fracutre.reform_area = parseFloat(area);
          this._fracutre.sustain_area = parseFloat(abilityArea);
          this._fracutre.valid_ratio = parseFloat(percent);
          break;
        case "wellpres.txt":
          this._fracutre.well_pres = fileContent;
          break;
        default:
          break;
      }
    }
    this.calFracInfo();
    this._planDetail.fracture_stats = TASK_CODE.FINISHED;
    await this._planDetail.save();
    await this._fracutre.save();
  }

  calFracInfo() {
    let fracPres = this._fracutre.frapres;
    let lastPart = utils.cutLastPart(fracPres);
    let pattern = "No.	 x	 y	";
    let parts = lastPart.split(pattern);
    let first = parts[0];
    let second = parts[1];
    let lst = [];
    let lines = second.split("\r\n");
    let L1 = 0; //大于0最大的那个
    let L2 = 0; //小于0最小的那个
    let mdMax = 0;
    let mdMin = 1000000;
    for (let index = 0; index < lines.length; index++) {
      const line = lines[index];
      let nums = line.split("\t ");
      if (nums.length < 3) {
        continue;
      }
      let longth = parseFloat(nums[2]);
      let md = parseFloat(nums[1]);
      if (mdMax == 0 && mdMin == 0) {
        mdMax = md;
        mdMin = md;
      }
      if (md > mdMax) {
        mdMax = md;
      }
      if (md < mdMin) {
        mdMin = md;
      }
      if (longth > 0) {
        if (longth > L1) {
          L1 = longth;
        }
      } else {
        if (longth < L2) {
          L2 = longth;
        }
      }
    }
    let LW = mdMax - mdMin;
    this._fracutre.l1 = Math.abs(L1);
    this._fracutre.l2 = Math.abs(L2);
    this._fracutre.lw = LW;
  }

  async caling() {
    await this.changeTaskStats(TASK_CODE.CALING);
  }

  async finished() {
    await this.changeTaskStats(TASK_CODE.FINISHED);
  }

  async error() {
    await this.changeTaskStats(TASK_CODE.ERROR);
  }

  async changeTaskStats(code) {
    this._planDetail.fracture_stats = code;
    await this._planDetail.save();
  }
}

module.exports = PlanDetailServices;
