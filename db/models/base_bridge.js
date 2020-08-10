/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_bridge', {
    id_base_bridge: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    bridge_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '名称'
    },
    bridge_format: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '规格型号'
    },
    bridge_max_OD: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大外径[mm]'
    },
    bridge_fit_pipe_inner_scope: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '适合套管内径范围[mm]'
    },
    bridge_work_pressure_diff: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '工作压差[MPa]'
    },
    bridge_temperature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '工作温度[℃]'
    },
    bridge_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '长度[mm]'
    },
    bridge_hole_gauge: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '孔眼内径[mm]'
    },
    bridge_ball_diameter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '投球直径[mm]'
    },
    bridge_fit_pipe_outer_scope: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '适合套管外径[mm]'
    },
    bridge_fit_pipe_weight: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '适合套管线重[kg/m]'
    },
    bridge_dissolve_temperature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '溶解温度[℃]'
    },
    bridge_dissolve_time: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '溶解时间[ms]'
    },
    bridge_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '单价[Yuan]'
    },
    bridge_producer: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '生产厂家'
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
    tableName: 'base_bridge'
  });
};
