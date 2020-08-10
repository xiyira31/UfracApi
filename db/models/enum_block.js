/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enum_block', {
    id_block_info: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: '区块名称'
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
    orderBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '排序'
    }
  }, {
    sequelize,
    tableName: 'enum_block'
  });
};
