const customParser = require('./custom');
const aceParser = require('./custom');
const FUNCTION_CODE = require('../../enums/FUNCTION_CODE');
const TASK_CODE = require('../../enums/TASK_CODE');
const models = require("../../db/models");

class QualityServices{

  constructor(qulity) {
    this._qulity = qulity;
  }

  async exec() {
    if(this._qulity.function_type === FUNCTION_CODE.ACE) {
      return await aceParser();
    }
    else if(this._qulity.function_type === FUNCTION_CODE.CUSTOM){
      return await customParser(this._qulity, this);
    }
    else{
      throw '没有这种functionType:' + this._functionType;
    }
  }

  // 删除之前的数据
  async removePre(t) {
    await models.proc_well_quatity_detail.destroy({
      where: {
        well_quatity: this._qulity.id,
      },
      transaction: t
    });
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
    this._qulity.stats = code;
    await this._qulity.save();
  }
}

module.exports = QualityServices;