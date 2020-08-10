/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_person', {
    id_base_person: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      comment: '姓名'
    },
    person_sex: {
      type: DataTypes.ENUM('男','女'),
      allowNull: false,
      defaultValue: "男",
      comment: '性别'
    },
    person_birthday: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '出生日期'
    },
    person_company: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '所属公司',
      references: {
        model: {
          tableName: 'base_company',
        },
        key: 'id_base_company'
      }
    },
    person_cellphone: {
      type: DataTypes.STRING(16),
      allowNull: true,
      comment: '手机号'
    },
    person_officephone: {
      type: DataTypes.STRING(16),
      allowNull: true,
      comment: '办公室电话'
    },
    person_email: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: 'email'
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
    tableName: 'base_person'
  });
};
