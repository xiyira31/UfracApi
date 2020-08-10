/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_plan_detail_production_result_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    plan_detail_production: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'proc_plan_detail_production',
        },
        key: 'id'
      }
    },
    month: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '月份'
    },
    free_gas_mass: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '游离气总量(m³)'
    },
    adsorb_gas_mass: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '吸附气总量(m³)'
    },
    total_gas_mass: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '气总量(m³)'
    },
    water_mass: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '水总量(m³)'
    },
    daily_production: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '日产量(m³)'
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
    }
  }, {
    sequelize,
    tableName: 'proc_plan_detail_production_result_detail'
  });
};
