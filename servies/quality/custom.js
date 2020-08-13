const Parser = require("expr-eval").Parser;
const models = require("../../db/models");
const utils = require("../../utils/utils");
const code = require("../../enums/RESPONSE_CODE");
const { Sequelize } = require("sequelize");

async function praser(wellInfoId, quatityFuncId, wellPlanId) {
  let func = await models.proc_quatity_function.findOne({
    where: {
      id: quatityFuncId,
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
      well: wellInfoId,
    },
  });
  //console.log(sequelize);
  await models.sequelize.transaction(async (t) => {
    let well_plan = await models.proc_well_plan.findOne({
      where: {
        id: wellPlanId,
      },
      transaction: t,
    });
    if (well_plan === null) {
      throw "没有这个方案!";
    }
    
    let well_quatity = await models.proc_well_quatity.create(
      {
        name: "",
        quatityfunction: quatityFuncId,
      },
      { transaction: t }
    ); 
    let oldWellQuatityId = well_plan.well_quatity;
    well_plan.well_quatity = well_quatity.id;
    await well_plan.save({ transaction: t });
    if (oldWellQuatityId !== null) {
      await models.proc_well_quatity_detail.destroy({
        where: {
          well_quatity: oldWellQuatityId,
        },
        transaction: t
      });
      await models.proc_well_quatity.destroy({
        where: {
          id: oldWellQuatityId,
        },
        transaction: t
      });
    }
    let qualityResults = [];
    // let count = 0;
    for (let index = 0; index < varsVals.length; index++) {
      const vals = varsVals[index];
      let result = expr.evaluate(vals);
      let qualityResult = {
        md: vals.md,
        value: result,
        well_quatity: well_quatity.id,
      };
      // count++;
      qualityResults.push(qualityResult);
      // if(count > 1){
      //   break;
      // }
    }
    // varsVals.forEach((vals) => {
    //   let result = expr.evaluate(vals);
    //   let qualityResult = {
    //     md: vals.md,
    //     value: result,
    //     well_quatity: well_quatity.id,
    //   };
    //   count++;
    //   qualityResults.push(qualityResult);
    //   if(count > 50){
    //     continue;
    //   }
    // });
    await models.proc_well_quatity_detail.bulkCreate(qualityResults, {
      transaction: t,
    });
  });

  return utils.responseString(code.SUCCESS, "成功！");
}

async function praserNoTransaction(wellInfoId, quatityFuncId, wellPlanId) {
  let func = await models.proc_quatity_function.findOne({
    where: {
      id: quatityFuncId,
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
      well: wellInfoId,
    },
  });
  //console.log(sequelize);
    let well_plan = await models.proc_well_plan.findOne({
      where: {
        id: wellPlanId,
      }
    });
    if (well_plan === null) {
      throw "没有这个方案!";
    }
    
    let well_quatity = await models.proc_well_quatity.create(
      {
        name: "",
        quatityfunction: quatityFuncId,
      }
    ); 
    let oldWellQuatityId = well_plan.well_quatity;
    well_plan.well_quatity = well_quatity.id;
    await well_plan.save();
    if (oldWellQuatityId !== null) {
      await models.proc_well_quatity_detail.destroy({
        where: {
          well_quatity: oldWellQuatityId,
        }
      });
      await models.proc_well_quatity.destroy({
        where: {
          id: oldWellQuatityId,
        }
      });
    }
    let qualityResults = [];
    let count = varsVals.length;
    //let count = 50;
    for (let index = 0; index < count; index++) {
      const vals = varsVals[index];
      let result = expr.evaluate(vals);
      let qualityResult = {
        md: vals.md,
        value: result,
        well_quatity: well_quatity.id,
      };
      qualityResults.push(qualityResult);
    }
    await models.proc_well_quatity_detail.bulkCreate(qualityResults, {
      fields: ["md", "value", "well_quatity"]
    });
  return utils.responseString(code.SUCCESS, "成功！");
}

module.exports = praser;
