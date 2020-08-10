/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('layer_perforation', {
    id_layer_perforation: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    layer: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: '射孔层段',
      references: {
        model: {
          tableName: 'layer_info',
        },
        key: 'id_layer_info'
      }
    },
    cluster_num: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '簇号'
    },
    cluster_over: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '底界[m]'
    },
    cluster_start: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '顶深[m]'
    },
    single_layer: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '所属小层'
    },
    phase: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '相位[°]'
    },
    SPF: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '孔密[孔/m]'
    },
    shooting_diameter: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '孔径[mm]'
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
    tableName: 'layer_perforation'
  });
};
