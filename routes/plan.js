let express = require('express');
let models  = require('../db/models');
let router = express.Router();
const RESPONSE_CODE = require('../enums/RESPONSE_CODE');
const TASK_CODE = require('../enums/TASK_CODE');
const CALCULATE_CODE = require('../enums/CALCULATE_CODE');
const utils = require('../utils/utils');
let PlanDetailServices = require('../servies/plan');

router.get('/:id',async function(req, res) {  
  const id = req.params.id;
  const type = req.query.type;
  if(id === null || id === undefined) {
    res.JSON(utils.responseString(RESPONSE_CODE.ERROR, 'id不能为空'));    
    return;
  }
  const planDetail = await models.proc_well_plan_detail.findOne({
    where:{
      id: id
    }
  });
  if(planDetail === null){
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '没有找到对应id记录'));
    return;
  }
  switch (type) {
    case CALCULATE_CODE.FRACUTRE:
      fractureRoute(planDetail, res);
      break;
    case CALCULATE_CODE.PRODUCTION:
      productionRoute(planDetail, res);
      break;
    default:
      res.json(utils.responseString(RESPONSE_CODE.ERROR, '未知的计算类型'));
      break;
  }

});

async function productionRoute(planDetail, res) {
  if(planDetail.production_stats === TASK_CODE.CALING) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务正在计算！'));
    return;
  }
  if(planDetail.production_stats === TASK_CODE.FINISHED) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务已经计算完成！'));
    return;
  }
  if(planDetail.production_stats === TASK_CODE.ERROR) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务发生错误！'));
    return;
  }
  let response = {};
  let planDetailServices = new PlanDetailServices(planDetail);
  try{
    response = await planDetailServices.productionExec(planDetail);
  }
  catch(error){
    console.log(error);
    response = utils.responseString(RESPONSE_CODE.ERROR, JSON.stringify(error));
    planDetailServices.error();
    res.json(response);
    return;
  }
  res.json(response);
}

async function fractureRoute(planDetail, res) {
  if(planDetail.fracture_stats === TASK_CODE.CALING) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务正在计算！'));
    return;
  }
  if(planDetail.fracture_stats === TASK_CODE.FINISHED) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务已经计算完成！'));
    return;
  }
  if(planDetail.fracture_stats === TASK_CODE.ERROR) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务发生错误！'));
    return;
  }
  let response = {};
  let planDetailServices = new PlanDetailServices(planDetail);
  try{
    response = await planDetailServices.fractureExec(planDetail);
  }
  catch(error){
    console.log(error);
    response = utils.responseString(RESPONSE_CODE.ERROR, JSON.stringify(error));
    planDetailServices.error();
    res.json(response);
    return;
  }
  res.json(response);
}


module.exports = router;