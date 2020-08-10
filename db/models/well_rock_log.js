/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_rock_log', {
    id_well_rock_log: {
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
    md: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '测深[m]'
    },
    poisson_ratio: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '泊松比'
    },
    youngs: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '杨氏模量[GPa]'
    },
    min_horizontal_major_stress: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最小水平主应力[MPa]'
    },
    max_horizontal_major_stress: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大水平主应力[MPa]'
    },
    vertical_stress: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '垂向应力[MPa]'
    },
    break_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '破裂压力[MPa]'
    },
    nonisotropy: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '各向异性'
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建时间'
    },
    tag: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1,
      comment: '有效状态'
    }
  }, {
    sequelize,
    tableName: 'well_rock_log'
  });
};
