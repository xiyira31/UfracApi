const models = require("../../db/models");
const TASK_CODE = require('../../enums/TASK_CODE');
const RESPONSE_CODE = require('../../enums/RESPONSE_CODE');
const utils = require('../../utils/utils');
const FractureService = require('../fracture');

class PlanDetailServices {
  constructor(planDetail) {
    this._planDetail = planDetail;
  }

  async fractureExec() {
    let fracture = await models.proc_plan_detail_fracture_result.findOne({
      where: {
        well_plan_detail: this._planDetail.id
      }
    });
    let fractureService = new FractureService(fracture, this._planDetail);
    await fractureService.exec();
    return utils.responseString(RESPONSE_CODE.SUCCESS, "已开始计算！");
  }

  async productionExec() {
    await this.caling('fracture_stats');    
    
    await this.finished('fracture_stats');
    return utils.responseString(RESPONSE_CODE.SUCCESS, "成功！");
  }

  async caling(type) {
    await this.changeTaskStats(TASK_CODE.CALING, type);
  }

  async finished(type) {
    await this.changeTaskStats(TASK_CODE.FINISHED, type);
  }

  async error(type) {
    await this.changeTaskStats(TASK_CODE.ERROR, type);
  }

  async changeTaskStats (code, type) {
    this._planDetail[type] = code;
    await this._planDetail.save();
  }
}

module.exports = PlanDetailServices;
