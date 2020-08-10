/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('layer_index', {
    id_layer_index: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    index: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '阶段号'
    },
    fluid: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '液体'
    },
    proppant: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '支撑剂'
    },
    layer: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '施工层段',
      references: {
        model: {
          tableName: 'layer_info',
        },
        key: 'id_layer_info'
      }
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
    tableName: 'layer_index'
  });
};
