/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_quatity', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '名称'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    quatityfunction: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链至proc_quatity_function',
      references: {
        model: {
          tableName: 'proc_quatity_function',
        },
        key: 'id'
      }
    },
    wellplan: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链至proc_well_plan',
      references: {
        model: {
          tableName: 'proc_well_plan',
        },
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'proc_well_quatity'
  });
};
