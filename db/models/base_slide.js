/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_slide', {
    id_base_slide: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    slide_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '名称'
    },
    slide_format: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '规格'
    },
    slide_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '长度[m]'
    },
    slide_ID: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '内径[mm]'
    },
    slide_max_OD: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大外径[mm]'
    },
    slide_open_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '开启压力[MPa]'
    },
    slide_work_temperature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '工作温度[℃]'
    },
    slide_effict_comm_section: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '有效沟通截面[mm^2]'
    },
    slide_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '单价[Yuan]'
    },
    slide_producer: {
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
    tableName: 'base_slide'
  });
};
