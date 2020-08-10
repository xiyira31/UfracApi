/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('layer_micro_fracture_test', {
    id_layer_micro_fracture_test: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    layer: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '小压层段',
      references: {
        model: {
          tableName: 'layer_info',
        },
        key: 'id_layer_info'
      }
    },
    aperture_friction: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '孔眼摩阻[MPa]'
    },
    wellbone_friction: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '井筒摩阻[MPa]'
    },
    drawdown_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '压降速率[MPa/min]'
    },
    layer_break_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '储层破裂压力[MPa]'
    },
    layer_close_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '储层闭合应力[MPa]'
    },
    layer_extend_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '储层延伸应力[MPa]'
    },
    fracture_net_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '缝内净压力[MPa]'
    },
    fluid_efficiency: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '液体效率[%]'
    },
    layer_permeability: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '储层渗透率[mD]'
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
    tableName: 'layer_micro_fracture_test'
  });
};
