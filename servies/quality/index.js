const Parser = require('expr-eval').Parser;
const models  = require('../../db/models');

async function qualityServices (request) {
  
  return await exprPraser(request.well_info_id, request.function_id);
}

async function exprPraser(wellInfoId, quatityFuncId){
  const func = await models.proc_quatity_function.findOne({
    where: {
      id: quatityFuncId
    }
  });
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
  let qualityResults = [];
  varsVals.forEach(vals => {
    let result = expr.evaluate(vals);
    let qualityResult = {
      md: vals.md,
      value: result
    };
    qualityResults.push(qualityResult);
  });
  return qualityResults;
}

module.exports = qualityServices;