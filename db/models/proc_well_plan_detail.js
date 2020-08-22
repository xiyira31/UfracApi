/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_plan_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    well_plan: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外键到proc_well_plan',
      references: {
        model: {
          tableName: 'proc_well_plan',
        },
        key: 'id'
      }
    },
    well_section_detail: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外键到proc_well_section_detail',
      references: {
        model: {
          tableName: 'proc_well_section_detail',
        },
        key: 'id'
      }
    },
    pumping_program: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外键到proc_pumping_program',
      references: {
        model: {
          tableName: 'proc_pumping_program',
        },
        key: 'id'
      }
    },
    fracture_algorithm: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外键到proc_fracture_algorithm',
      references: {
        model: {
          tableName: 'proc_fracture_algorithm',
        },
        key: 'id'
      }
    },
    production_algorithm: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外键到proc_production_algorithm',
      references: {
        model: {
          tableName: 'proc_production_algorithm',
        },
        key: 'id'
      }
    },
    fracture_stats: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '裂缝预测计算状态'
    },
    production_stats: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '产能预测计算状态'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'proc_well_plan_detail'
  });
};
