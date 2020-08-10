/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enum_single_layer', {
    id_enum_single_layer: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '层段名'
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建时间'
    },
    tag: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1,
      comment: '有效标志'
    }
  }, {
    sequelize,
    tableName: 'enum_single_layer'
  });
};
