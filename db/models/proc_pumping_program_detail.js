/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_pumping_program_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    pumping_program: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链到proc_pumping_program',
      references: {
        model: {
          tableName: 'proc_pumping_program',
        },
        key: 'id'
      }
    },
    period_no: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '阶段号'
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '阶段名称'
    },
    flow_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '排量(m³/min)'
    },
    stage_fluid_vol: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '阶段液量(m³)'
    },
    stage_proppant_vol: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '阶段砂量(ton)'
    },
    pump_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '泵压(MPa)'
    },
    balance_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '平衡压(MPa)'
    },
    amount_fluid_vol: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '总液量(m³)'
    },
    proppant_consentration: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '砂浓度(kg/m³)'
    },
    amount_proppant_vol: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '总砂量(ton)'
    },
    fluid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链到base_fracture_fluid',
      references: {
        model: {
          tableName: 'base_frac_fluid',
        },
        key: 'id_base_frac_fluid'
      }
    },
    proppant: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链到base_proppant',
      references: {
        model: {
          tableName: 'base_proppant',
        },
        key: 'id_base_proppant'
      }
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
    tableName: 'proc_pumping_program_detail'
  });
};
