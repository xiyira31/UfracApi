var createError = require('http-errors');
var express = require('express');
const models  = require('../db/models');
var router = express.Router();
var qualityServies = require('../servies/quality');

router.get('/:id',async function(req, res, next) {  
  const id = req.params.id;
  if(id === null || id === undefined) {
    next(createError('id不能为空'));    
  }
  const task = await models.proc_task.findOne({
    where:{
      id: id
    }
  });
  if(task === null){
    next(createError('没有找到任务'));
  }
  let response = {};
  let request = JSON.parse(task.request_args);
  switch(task.task_type){
    case 1:
      response = await qualityServies(request);
      break;
  }
  res.send(response);
});

module.exports = router;