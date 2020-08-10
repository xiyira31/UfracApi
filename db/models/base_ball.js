/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_ball', {
    id_base_ball: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    ball_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '名称'
    },
    ball_format: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '规格型号'
    },
    ball_diameter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '直径[mm]'
    },
    ball_close_pressure_diff: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '封堵压差[MPa]'
    },
    ball_work_temperature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '工作温度[℃]'
    },
    ball_dissolve_temperature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '溶解温度[℃]'
    },
    ball_dissolve_time: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '溶解时间[ms]'
    },
    ball_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '单价[Yuan]'
    },
    ball_producer: {
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
    tableName: 'base_ball'
  });
};
