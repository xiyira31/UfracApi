const models = require("../../db/models");
const TASK_CODE = require("../../enums/TASK_CODE");
const RESPONSE_CODE = require("../../enums/RESPONSE_CODE");
const utils = require("../../utils/utils");

const fs = require("fs");
const path = require("path");
const { dir } = require("console");
const iconv = require("iconv-lite");
const { listeners } = require("process");

const spawn = require("child_process").spawn;
const spawnSync = require("child_process").spawnSync;
const cmd = require("node-cmd");

const inputFormat = require("./inputFormat");

class PlanDetailServices {
  constructor(production, planDetail) {
    this._production = production;
    this._planDetail = planDetail;
    this._matrix_porosity = production.matrix_porosity;
    this._matrix_permeability = production.matrix_permeability;
    this._fracture_porosity = production.fracture_porosity;
    this._fracture_permeability = production.fracture_permeability;
    this._well_bottom_pressure = production.well_bottom_pressure;
    this._gas_content = production.gas_content;
    this._grid_width = production.grid_width;
    this._grid_thickness = production.grid_thickness;
  }

  async exec() {
    await this.init();
    await this.caling();
    this.runCMD();
    return utils.responseString(RESPONSE_CODE.SUCCESS, "已开始计算！");
  }

  async init() {
    await this.initFloder(this._production.id);
    let gridContent = await this.initGrid();
    await this.initInputFile(gridContent);
  }

  runCMD() {
    cmd.that = this;
    cmd.get(
      this._exePath +
        " " +
        this._inputFilePath +
        " " +
        this._rootFloder,
      async function (err, data, stderr) {
        console.log(err);
        if(err) {
          throw err;
        }
        let that = this
        await cmd.that.saveProduction();
      }
    );
  }

  async saveProduction() {
    this._productionFilePath = path.join(this._rootFloder, "Prod");
    let prodContent = await fs.readFileSync(this._productionFilePath, 'utf8');
    let lines = prodContent.split("\r\n");
    if (lines.length < 3) {
      return;
    }
    let unRepeatLines = [];
    //去重
    for (let index = 0, timeSet = new Set(); index < lines.length; index++) {
      const line = lines[index];
      let group = line.split(",");
      if (timeSet.has(group[0])) {
        continue;
      }
      timeSet.add(group[0]);
      unRepeatLines.push(line);
    }
    let baseData = unRepeatLines[9].split(",");
    let baseDetail = this.generateBaseProd(baseData);
    let prods = [];
    for (let index = 10; index < unRepeatLines.length; index++) {
      const data = unRepeatLines[index].split(",");
      let detail = this.generateProd(data, baseDetail);
      if (detail === null) {
        continue;
      }
      prods.push(detail);
    }
    this.calculateDailyProduction(prods);
    this.calProductionFix(prods);
    await models.sequelize.transaction(async (t) => {
      await models.proc_plan_detail_production_result_detail.destroy({
        where: {
          plan_detail_production: this._production.id
        },
        transaction: t
      })
      await models.proc_plan_detail_production_result_detail.bulkCreate(prods,{
        transaction: t
      });
      this._planDetail.production_stats = 2;
      await this._planDetail.save();
    })
    
  }

  calculateDailyProduction(details) {
    details[0].daily_production =
      details[0].total_gas_mass / details[0].month / 30;
    for (let i = 1; i < details.length; i++) {
      let detail = details[i];
      let preDetail = details[i - 1];
      if (detail.month == preDetail.month) {
        continue;
      }
      let daily =
        (detail.total_gas_mass - preDetail.total_gas_mass) /
        (detail.month - preDetail.month) /
        30;
      detail.daily_production = daily;
    }
  }

  calProductionFix(details) {
    let preDetail = {};
    details.forEach((detail) => {
      let month = detail.month;
      detail.daily_production = detail.daily_production / (1 + 0.1 * month);
      if (detail.month == 1) {
        detail.total_gas_mass = detail.daily_production * 30;
      } else {
        detail.total_gas_mass =
          detail.daily_production * 30 + preDetail.total_gas_mass;
      }
      preDetail = detail;
    });
  }

  generateBaseProd(data) {
    let detail = {};
    let year = parseFloat(data[0].trim());
    let freeGasMass = parseFloat(data[1]);
    let absoreGasMass = parseFloat(data[2]);
    let totalGasMass = parseFloat(data[3]);
    let waterMass = parseFloat(data[4]);

    freeGasMass = freeGasMass < 0 ? 0 : freeGasMass;
    absoreGasMass = absoreGasMass < 0 ? 0 : absoreGasMass;
    totalGasMass = totalGasMass < 0 ? 0 : totalGasMass;
    waterMass = waterMass < 0 ? 0 : waterMass;

    detail.year = year;
    detail.free_gas_mass = freeGasMass; //kg换算为方
    detail.adsorb_gas_mass = absoreGasMass;
    detail.total_gas_mass = totalGasMass;
    detail.water_mass = waterMass / 1000; //kg换算为方
    return detail;
  }

  generateProd(data, baseDetail) {
    let detail = this.generateBaseProd(data);
    detail.month = utils.containMonth(detail.year.toFixed(9));
    if (detail.month === null) {
      return null;
    }
    let factor = 4;
    detail.free_gas_mass =
      (baseDetail.free_gas_mass - detail.free_gas_mass) / factor; //kg换算为方
    detail.adsorb_gas_mass =
      (baseDetail.adsorb_gas_mass - detail.adsorb_gas_mass) / factor;
    detail.total_gas_mass =
      (baseDetail.total_gas_mass - detail.total_gas_mass) / factor;
    detail.water_mass =
      (baseDetail.water_mass - detail.water_mass / 1000) / factor; //kg换算为方
    detail.plan_detail_production = this._production.id;
    return detail;
  }

  async initInputFile(gridContent) {
    this._inputFilePath = path.join(this._rootFloder, "SHALEGAS_input.dat");
    let matrix_porosity = this._matrix_porosity.toFixed(3) / 100;
    let matrix_permeability = this._matrix_permeability.toFixed(3) * 1e-19;
    let fracture_porosity = this._fracture_porosity / 100;
    let fracture_permeability = this._fracture_permeability * 1e-19;
    let well_bottom_pressure = this._well_bottom_pressure / 100;
    let gas_content = this._gas_content;
    if (!String.prototype.format) {
      String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
          return typeof args[number] != "undefined" ? args[number] : match;
        });
      };
    }
    let inputFileContent = inputFormat.format(
      matrix_porosity.toFixed(7),
      matrix_permeability.toExponential(3),
      matrix_permeability.toExponential(3),
      matrix_permeability.toExponential(3),
      fracture_porosity.toFixed(7),
      fracture_permeability.toExponential(3),
      fracture_permeability.toExponential(3),
      fracture_permeability.toExponential(3),
      gridContent,
      gas_content.toFixed(2)
    );
    await fs.writeFileSync(this._inputFilePath, inputFileContent);
  }

  async initFloder(produtionId) {
    let exePath = path.resolve('.', 'production', 'exe', 'EMC-SHALEGAS.exe');
    this._exePath = exePath;
    let dirPath = path.resolve(".", "productionResults/", produtionId.toString());
    let has = await fs.existsSync(dirPath);
    if (!has) {
      await fs.mkdirSync(dirPath);
    }
    this._rootFloder = dirPath;
  }

  async initGrid() {
    let fracture = await models.proc_plan_detail_fracture_result.findOne({
      where: {
        well_plan_detail: this._planDetail.id,
      },
    });
    if (fracture === null) {
      throw "未找到裂缝预测结果！";
    }
    let lastPart = utils.cutLastPart(fracture.fraWidth);
    let pattern = "---------节点信息：节点编号，节点x坐标，节点y坐标---------";
    let parts = lastPart.split(pattern);
    let elemPart = parts[0];
    let nodePart = parts[1];
    let elems = this.makeElems(elemPart).join('\n');
    let nodes = this.makeNodes(nodePart).join('\n');
    let pyPath = path.join('./', 'production', 'python', 'production.py');
    let elemsPath = path.join(this._rootFloder, "elems.txt");
    let nodesPath = path.join(this._rootFloder, "nodes.txt");
    let filePath = path.join(this._rootFloder, "result.txt");
    let args = [];
    await fs.writeFileSync(elemsPath, elems);
    await fs.writeFileSync(nodesPath, nodes);
    args.push(pyPath);
    args.push(filePath);
    args.push(elemsPath);
    args.push(nodesPath);
    console.log("python2 " + args.join(" "));
    await spawnSync("python2", args);
    let content = await fs.readFileSync(filePath);
    return content;
  }

  makeElems(elemPart) {
    let lines = elemPart.split("\n");
    lines.splice(0, 7);
    let results = [];
    for (let index = 0; index < lines.length; ++index) {
      let line = lines[index];
      let vals = line.split("\t");
      if (vals.length < 3) {
        continue;
      }
      let node = [parseFloat(vals[1]), parseFloat(vals[2])];
      results.push(node);
    }
    let count = results.length;
    let doubleResults = [];
    for (let i = 0; i < count; i++) {
      let result = results[i];
      let doubleResult = [];
      doubleResult.push(result[0]);
      doubleResult.push(result[1]);
      doubleResults.push(doubleResult);
    }
    return doubleResults;
  }

  makeNodes(nodePart) {
    let lines = nodePart.split("\n");
    lines.splice(0, 2);
    let results = [];
    for (let index = 0; index < lines.length; ++index) {
      let line = lines[index];
      let vals = line.split("\t");
      if (vals.length < 3) {
        continue;
      }
      let node = [parseFloat(vals[1]), parseFloat(vals[2])];
      results.push(node);
    }
    let count = results.length;
    let doubleResults = [];
    for (let i = 0; i < count; i++) {
      let result = results[i];
      let doubleResult = [];
      doubleResult.push(result[0]);
      doubleResult.push(result[1]);
      doubleResults.push(doubleResult);
    }
    return doubleResults;
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
    this._planDetail.production_stats = code;
    await this._planDetail.save();
  }
}

module.exports = PlanDetailServices;
