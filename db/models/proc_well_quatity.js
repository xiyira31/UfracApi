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
    stats: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '任务状态0=未计算，1=计算中，2=完成'
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
    well_plan: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链至proc_well_plan',
      references: {
        model: {
          tableName: 'proc_well_plan',
        },
        key: 'id'
      }
    },
    function_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '自定义=0，ACE法=1，DPEI=2'
    }
  }, {
    sequelize,
    tableName: 'proc_well_quatity'
  });
};
