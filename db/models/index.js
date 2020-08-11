const path = require('path');
const fs = require('fs');
const db = require('../index');
const {DataTypes} = require('sequelize');
const models = {};

module.exports = (() => {
  if (!Object.keys(models).length) {
    const sequelize = db.getConnection();
    const files = fs.readdirSync(__dirname);
    const excludedFiles = ['.', '..', 'index.js'];

    for (const fileName of files) {
      if (!excludedFiles.includes(fileName) && (path.extname(fileName) === '.js')) {
        const modelFile = require(path.join(__dirname, fileName))(sequelize, DataTypes);
        models[modelFile.getTableName()] = modelFile;
      }
    }

    Object
      .values(models)
      .forEach(model => {
        if (typeof model.associate === 'function') {
          model.associate(models);
        }
      });

      models["proc_well_quatity"].hasMany(models["proc_well_quatity_detail"], {
        foreignKey: 'well_quatity',
        as: 'details'
      });

    models.sequelize = sequelize;
  }

  return models;
})();
