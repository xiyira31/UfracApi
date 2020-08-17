let express = require('express');
let models  = require('../db/models');
let router = express.Router();
const RESPONSE_CODE = require('../enums/RESPONSE_CODE');
const TASK_CODE = require('../enums/TASK_CODE');
const utils = require('../utils/utils');
let DfnServices = require('../servies/dfn');

router.get('/:id',async function(req, res) {  
  const id = req.params.id;
  if(id === null || id === undefined) {
    res.JSON(utils.responseString(RESPONSE_CODE.ERROR, 'id不能为空'));    
    return;
  }
  const dfn = await models.proc_well_dfn.findOne({
    where:{
      id: id
    }
  });
  if(dfn === null){
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '没有找到对应id记录'));
    return;
  }
  if(dfn.stats === TASK_CODE.CALING) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务正在计算！'));
    return;
  }
  if(dfn.stats === TASK_CODE.FINISHED) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务已经计算完成！'));
    return;
  }
  if(dfn.stats === TASK_CODE.ERROR) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务发生错误！'));
    return;
  }
  let response = {};
  let dfnServices = new DfnServices(dfn);
  try{
    response = await dfnServices.exec();
  }
  catch(error){
    console.log(error);
    response = utils.responseString(RESPONSE_CODE.ERROR, JSON.stringify(error));
    dfnServices.error();
    res.json(response);
    return;
  }
  res.json(response);
});

module.exports = router;