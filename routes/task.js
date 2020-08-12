let express = require('express');
let models  = require('../db/models');
let router = express.Router();
const RESPONSE_CODE = require('../enums/RESPONSE_CODE');
const TASK_CODE = require('../enums/TASK_CODE');
const utils = require('../utils/utils');
let TaskServices = require('../servies/task');
let QualityServices = require('../servies/quality')

router.get('/:id',async function(req, res) {  
  const id = req.params.id;
  if(id === null || id === undefined) {
    res.JSON(utils.responseString(RESPONSE_CODE.ERROR, 'id不能为空'));    
    return;
  }
  const task = await models.proc_task.findOne({
    where:{
      id: id
    }
  });
  if(task === null){
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '没有找到任务'));
    return;
  }
  if(task.stats === TASK_CODE.CALING) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务正在计算！'));
    return;
  }
  if(task.stats === TASK_CODE.FINISHED) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务已经计算完成！'));
    return;
  }
  if(task.stats === TASK_CODE.ERROR) {
    res.json(utils.responseString(RESPONSE_CODE.ERROR, '任务发生错误！'));
    return;
  }
  let response = {};
  let taskServices = new TaskServices(task);
  let request = JSON.parse(task.request_args);
  await taskServices.caling();
  try{
    switch(task.task_type){
      case 1:
        let qualityServices = new QualityServices(request);
        response = await qualityServices.exec();
        break;
    }
    
    await taskServices.finished(response);
  }
  catch(error){
    console.log(error);
    response = utils.responseString(RESPONSE_CODE.ERROR, JSON.stringify(error));
    await taskServices.error(response);
    return;
  }
  res.json(response);
});

module.exports = router;