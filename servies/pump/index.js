const models = require("../../db/models");
const TASK_CODE = require('../../enums/TASK_CODE');
const RESPONSE_CODE = require('../../enums/RESPONSE_CODE');
const utils = require('../../utils/utils');

class PumpingsServices {
  constructor(pumpings) {
    this._pumpings = pumpings;
    let last = pumpings.length - 1;
    this._fluidVol = pumpings[last].amount_fluid_vol;
    this._proppantVol = pumpings[last].amount_proppant_vol;
    this._flowRate = this.getFlowRate();
    this._proppantRate = this._proppantVol / this._fluidVol * 1.25;
    this._preTime = this._fluidVol / 2 / this._flowRate;
    this._suffTime = this._fluidVol / 2 / this._flowRate;
  }

  getUsedFluid() {
    let fluidUseds = {};
    let fluids = [];
    this._pumpings.forEach(pumping => {
      if(fluidUseds[pumping.fluid] === undefined) {
        fluidUseds[pumping.fluid] = pumping.stage_fluid_vol;
        fluids.push(pumping.fluid);
      }
      else{
        fluidUseds[pumping.fluid] += pumping.stage_fluid_vol;
      }
    });
    let maxUserFluid = null;
    let maxUserFluidVol = 0;
    fluids.forEach(fluid => {
      let fluidUsed = fluidUseds[fluid];
      if(maxUserFluidVol < fluidUsed){
        maxUserFluid = fluid;
        maxUserFluidVol = fluidUsed;
      }
    })
    return maxUserFluid;
  }

  getFlowRate() {
    let maxFlowRate = 0;
    this._pumpings.forEach(pumping => {
      if(maxFlowRate < pumping.flow_rate){
        maxFlowRate = pumping.flow_rate;
      }
    })
    return maxFlowRate;
  }

  getFluidVol() {

  }

  getProppant() {

  }
}

module.exports = PumpingsServices;
