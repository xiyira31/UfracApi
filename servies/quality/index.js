const Parser = require('expr-eval').Parser;
const models  = require('../../db/models');
const utils = require('../../utils/utils');
const code = require('../../enums/RESPONSE_CODE');
const {Sequelize} = require('sequelize');

async function qualityServices (request) {
  return await exprPraser(request.well_info_id, request.function_id, request.well_plan_id);
}

async function exprPraser(wellInfoId, quatityFuncId, wellPlanId){
  const func = await models.proc_quatity_function.findOne({
    where: {
      id: quatityFuncId
    }
  });
  if(func == null){
    throw '没有对应方法:';
  }
  const equation = func.equation;
  let parser = new Parser();
  let expr = parser.parse(equation);
  let vars = expr.variables();
  vars.push('md'); //需要填入MD
  let varsVals = await models.well_formation.findAll({
    attributes: vars,
    where: {
      well: wellInfoId
    }
  });
  
  try {
    //console.log(sequelize);
    const result = await models.sequelize.transaction(async (t) => {
  
      let well_quatity = await models.proc_well_quatity.create({
        name:'',
        wellplan: wellPlanId,
        quatityfunction: quatityFuncId
      }, { transaction: t });
      let qualityResults = [];
      varsVals.forEach(vals => {
        let result = expr.evaluate(vals);
        let qualityResult = {
          md: vals.md,
          value: result,
          well_quatity: well_quatity.id
        };
        qualityResults.push(qualityResult);
      });
      await models.proc_well_quatity_detail.bulkCreate(qualityResults, { transaction: t });  
    });
  
  } catch (error) {
    throw error;
  }

  return utils.responseString(code.SUCCESS, "成功！");
}

module.exports = qualityServices;