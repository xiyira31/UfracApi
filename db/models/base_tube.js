/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_tube', {
    id_base_tube: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    tube_format: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '尺寸[mm]'
    },
    tube_thick: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '壁厚[mm]'
    },
    tube_inner_diameter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '内径[mm]'
    },
    tube_grade: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '钢级'
    },
    tube_unit_weight_with_thick: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '单重-加厚[kg/m]'
    },
    tube_unit_weight_without_thick: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '单重-不加厚[kg/m]'
    },
    tube_drift_diameter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '通径[mm]'
    },
    tube_connection_strengths_without_thick: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '连接强度-不加厚[KN]'
    },
    tube_connection_strengths_with_thick: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '连接强度-加厚[KN]'
    },
    tube_tensile_strength: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗拉强度[KN]'
    },
    tube_inner_pressure_strength_without_thick: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗内压强度-不加厚[MPa]'
    },
    tube_inner_pressure_strength_with_thick: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗内压强度-加厚[MPa]'
    },
    tube_collapsing_strength: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗外挤强度[MPa]'
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '名称'
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
    tableName: 'base_tube'
  });
};
