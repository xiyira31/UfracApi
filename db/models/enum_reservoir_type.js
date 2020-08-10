/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enum_reservoir_type', {
    id_enum_reservoir_type: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
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
    tableName: 'enum_reservoir_type'
  });
};
