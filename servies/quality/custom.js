const Parser = require("expr-eval").Parser;
const models = require("../../db/models");
const utils = require("../../utils/utils");
const code = require("../../enums/RESPONSE_CODE");
const { Sequelize } = require("sequelize");

async function praser(quatity, service) {
  let func = await models.proc_quatity_function.findOne({
    where: {
      id: quatity.quatityfunction
    },
  });
  if (func == null) {
    throw "没有对应方法:";
  }
  const equation = func.equation;
  let parser = new Parser();
  let expr = parser.parse(equation);
  let vars = expr.variables();
  vars.push("md"); //需要填入MD
  let varsVals = await models.well_formation.findAll({
    attributes: vars,
    where: {
      well: quatity.wellPlan.well,
    },
  });
  if(varsVals.length === 0) {
    throw '测井数据为空，无法计算储层质量！';
  }
  service.caling();
  await models.sequelize.transaction(async (t) => {
    service.removePre(t);
    let qualityResults = [];
    // let count = 0;
    for (let index = 0; index < varsVals.length; index++) {
      const vals = varsVals[index];
      let result = expr.evaluate(vals);
      let qualityResult = {
        md: vals.md,
        value: result,
        well_quatity: quatity.id,
      };
      qualityResults.push(qualityResult);
    }
    await models.proc_well_quatity_detail.bulkCreate(qualityResults, {
      transaction: t,
    });
  });
  service.finished();
  return utils.responseString(code.SUCCESS, "成功！");
}

module.exports = praser;
