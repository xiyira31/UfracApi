/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('layer_microearthquake', {
    id_layer_microearthquake: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    layer: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '段'
    },
    microdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: '日期'
    },
    microtime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '时间'
    },
    north: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '绝对X坐标(EAST)'
    },
    east: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '绝对Y坐标(NORTH)'
    },
    down: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '垂深'
    },
    min_earthquake: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最小震级'
    },
    max_earthquake: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大震级'
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
    tableName: 'layer_microearthquake'
  });
};
