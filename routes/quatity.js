let express = require('express');
let models  = require('../db/models');
let router = express.Router();
const RESPONSE_CODE = require('../enums/RESPONSE_CODE');
const TASK_CODE = require('../enums/TASK_CODE');
const utils = require('../utils/utils');
let QualityServices = require('../servies/quality');

var Ajv = require('ajv');

const qualitySchema = require('../schemas/quality.json');

router.get('/:id',async function(req, res) {  
  const id = req.params.id;
  if(id === null || id === undefined) {
    res.JSON(utils.responseString(RESPONSE_CODE.ERROR, 'id不能为空'));    
    return;
  }
  const quatity = await models.proc_well_quatity.findOne({
    where:{
      id: id
    },
    include: [
      {
        model: models.proc_well_plan,
        as: "wellPlan"
      }
    ]
  });
  if(quatity === null){
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '没有找到任务'));
    return;
  }
  if(quatity.stats === TASK_CODE.CALING) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务正在计算！'));
    return;
  }
  if(quatity.stats === TASK_CODE.FINISHED) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务已经计算完成！'));
    return;
  }
  if(quatity.stats === TASK_CODE.ERROR) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务发生错误！'));
    return;
  }
  let response = {};
  let qualityServices = new QualityServices(quatity);
  try{
    response = await qualityServices.exec();
  }
  catch(error){
    console.log(error);
    response = utils.responseString(RESPONSE_CODE.ERROR, JSON.stringify(error));
    qualityServices.error();
    res.json(response);
    return;
  }
  res.json(response);
});

module.exports = router;