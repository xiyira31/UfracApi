/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sys_login', {
    id_base_login: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    login_name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '登录名',
      unique: true
    },
    login_password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: '密码'
    },
    login_salt: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '加密口令'
    },
    id_base_person: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '关联账户',
      references: {
        model: {
          tableName: 'base_person',
        },
        key: 'id_base_person'
      }
    },
    is_admin: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
      comment: '管理员'
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
    tableName: 'sys_login'
  });
};
