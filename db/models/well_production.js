/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_production', {
    id_well_production: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    well: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '井',
      references: {
        model: {
          tableName: 'well_info',
        },
        key: 'id_well_info'
      }
    },
    section: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '测试区间'
    },
    ground_water: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '地面产水[m^3/d]'
    },
    ground_gas: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '地面产气[10^4m^3/d]'
    },
    earth_water: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '地层产水[m^3/d]'
    },
    earth_gas: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '地层产气[10^4m^3/d]'
    },
    work_rule: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '工作制度',
      references: {
        model: {
          tableName: 'enum_work_rule',
        },
        key: 'id_enum_work_rule'
      }
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建时间'
    },
    tag: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1,
      comment: '有效标志'
    }
  }, {
    sequelize,
    tableName: 'well_production'
  });
};
