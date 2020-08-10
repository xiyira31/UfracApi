/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_role_power', {
    id_sys_role_power: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    table_name_en: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '表格名称',
      unique: true
    },
    table_name_cn: {
      type: DataTypes.STRING(100),
      allowNull: false,
      comment: '表格备注'
    },
    table_group: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: '表格分组'
    },
    group_order: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '组内排序'
    },
    role1: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      defaultValue: "00000",
      comment: '角色1权限'
    },
    role2: {
      type: DataTypes.CHAR(5),
      allowNull: true,
      defaultValue: "00000",
      comment: '角色2权限'
    },
    creator: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: "admin",
      comment: '创建者'
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
    tableName: 'sys_role_power'
  });
};
