/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_backup_info', {
    id_sys_backup_info: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    backup_path: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '备份地址'
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建时间'
    },
    creator: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '创建者'
    },
    tag: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1,
      comment: '有效状态'
    }
  }, {
    sequelize,
    tableName: 'sys_backup_info'
  });
};
