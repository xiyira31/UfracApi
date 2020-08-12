const customParser = require('./custom');
const aceParser = require('./custom');
const FUNCTION_CODE = require('../../enums/FUNCTION_CODE');

class QualityServices{

  constructor(request) {
    this._wellInfoId = request.well_info_id;
    this._functionId = request.function_id;
    this._wellPlanId = request.well_plan_id;
    this._functionType = request.function_type;
  }

  async exec() {
    if(this._functionType === FUNCTION_CODE.ACE) {
      return await aceParser();
    }
    else if(this._functionType === FUNCTION_CODE.CUSTOM){
      return await customParser(this._wellInfoId, this._functionId, this._wellPlanId);
    }
    else{
      throw '没有这种functionType:' + this._functionType;
    }
  }
}

module.exports = QualityServices;