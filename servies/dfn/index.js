const models = require("../../db/models");
const TASK_CODE = require('../../enums/TASK_CODE');
const RESPONSE_CODE = require('../../enums/RESPONSE_CODE');
const utils = require('../../utils/utils');

class DfnServices {
  constructor(dfn) {
    this._dfn = dfn;
    this._start = dfn.start;
    this._end = dfn.end;
    this._avg_length = dfn.avg_length;
    this._angle = dfn.angle;
    this._density = dfn.density;
    this._y_offset = dfn.y_offset;
    this._angle_offset = dfn.angle_offset;
    this._min_length = dfn.min_length;
  }

  async exec() {
    await this.caling();
    let dfns  = await this.createDnfs();
    await this.saveDfns(dfns);
    await this.finished();
    return utils.responseString(RESPONSE_CODE.SUCCESS, "成功！");
  }

  async createDnfs() {
    let sectionLength = this._end - this._start;
    if(sectionLength <= 0) {
      throw '开始点大于结束点';
    }
    if(this._density <= 0) {
      throw '裂缝密度应该大于0';
    }
    let area = sectionLength * this._y_offset;
    let dfns = [];
    let totalLength = 0;
    let deadlockCount = 0
    while (true) {
      deadlockCount++;
      if(deadlockCount > 100000){
        throw '程序死锁，参数存在问题！';
      }
      let dfn = this.createDfnDetail();
      if(dfn.length < this._min_length) {
        continue;
      }
      else{
        dfns.push(dfn);
        totalLength += dfn.length;
        dfn.dfn = this._dfn.id;
        if(totalLength / area > this._density) {
          break;
        }
      }
    }
    return dfns;
  }

  async saveDfns(dfns) {
    await models.sequelize.transaction(async (t) => {
      await models.proc_well_dfn_detail.destroy({
        where: {
          dfn: this._dfn.id
        },
        transaction : t
      });
      await models.proc_well_dfn_detail.bulkCreate(dfns,{
        transaction: t
      });
    });
  }

  createDfnDetail() {
    let sectionLength = this._end - this._start;
    let dfn = {};
    dfn.x = Math.random() * sectionLength + this._start;
    dfn.y = Math.random() * this._y_offset - this._y_offset / 2;
    dfn.theta = this._angle + Math.random() * this._angle_offset;
    dfn.length = Math.random() * this._avg_length;
    dfn.is_auto = 1;
    return dfn;
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

  async changeTaskStats (code) {
    this._dfn.stats = code;
    await this._dfn.save();
  }
}

module.exports = DfnServices;
