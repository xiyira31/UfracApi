const models = require("../../db/models");
const utils = require('../../utils/utils');
const path = require('path');
const fs = require('fs');

class DfnDetailsServices {
  // dfnDetails 需要从小到大按md排列
  constructor(dfnDetails) {
    this._dfnDetails = dfnDetails;
  }

  async createDfnFile(filePath, start, end) {
    filePath = path.join(filePath, 'DFN.poly');
    let selecteds = [];
    let count = this._dfnDetails.length;
    for(let index = 0;index < count ; ++index){
      let detail = this._dfnDetails[index];
      if(detail.x >= start && detail.x < end){
        selecteds.push(detail);
      }
    }
    if(selecteds.length === 0) {
      return;
    }
    await this.saveDfnFile(selecteds, filePath);
  }

  async saveDfnFile(selectedDetails, filePath) {
    let dfnStr = [];
    for (let index = 0, count = selectedDetails.length; index < count; index++) {
      const detail = selectedDetails[index];
      let str = detail.x + ' ' + detail.y + ' ' + detail.theta + ' ' + detail.length;
      dfnStr.push(str);
    }
    let allStr = dfnStr.join('\r\n');
    await fs.writeFileSync(filePath, allStr);
  }
}

module.exports = DfnDetailsServices;
