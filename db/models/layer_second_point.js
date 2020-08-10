/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('layer_second_point', {
    id_layer_second_point: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    layer: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '层',
      references: {
        model: {
          tableName: 'layer_info',
        },
        key: 'id_layer_info'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '时间'
    },
    stage_index: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '阶段号'
    },
    casing_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '套压[MPa]'
    },
    tube_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '油压[MPa]'
    },
    annulus_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '环空压力[MPa]'
    },
    delivery: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '排量[m^3/min]'
    },
    stage_vol: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '阶段液量[m^3]'
    },
    accumulate_vol: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '累计液量[m^3]'
    },
    proppant_concentration: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '支撑剂浓度[Kg/m^3]'
    },
    stage_proppant_vol: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '阶段砂量[ton]'
    },
    accumulate_proppant: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '累计砂量[ton]'
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
    tableName: 'layer_second_point'
  });
};
