/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_pipe', {
    id_base_pipe: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    pipe_format: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '套管尺寸[mm]'
    },
    pipe_thick: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '壁厚[mm]'
    },
    pipe_inner_diameter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '内径[mm]'
    },
    pipe_grade: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '钢级'
    },
    pipe_connection_strengths_short: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '连接强度-短圆扣[KN]'
    },
    pipe_connection_strengths_long: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '连接强度-长圆扣[KN]'
    },
    pipe_connection_strengths_BTC: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '连接强度-偏梯扣[KN]'
    },
    pipe_tensile_strength: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗拉强度[KN]'
    },
    pipe_inner_pressure_strength_short: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗内压强度-短圆扣[MPa]'
    },
    pipe_inner_pressure_strength_long: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗内压强度-长圆扣[MPa]'
    },
    pipe_inner_pressure_strength_BTC: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗内压强度-偏梯扣[MPa]'
    },
    pipe_collapsing_strength: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗外挤强度[MPa]'
    },
    pipe_unit_weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '单重[kg/m]'
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
    tableName: 'base_pipe'
  });
};
