/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('layer_srv', {
    id_layer_SRV: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    frac_net_west: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝网络西翼[m]'
    },
    frac_net_east: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝网络东翼[m]'
    },
    frac_net_width: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝网络宽[m]'
    },
    frac_net_height: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝网络高[m]'
    },
    frac_net_going: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝网络走向[°]'
    },
    event_num: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '事件数'
    },
    min_energy: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最小震级'
    },
    max_energy: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大震级'
    },
    SRV: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'SRV[10*4m^3]'
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
    tableName: 'layer_srv'
  });
};
