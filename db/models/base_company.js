/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_company', {
    id_base_company: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    company_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '公司名称'
    },
    company_manager: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '公司负责人'
    },
    company_address: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: '公司地址'
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
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'base_company'
  });
};
