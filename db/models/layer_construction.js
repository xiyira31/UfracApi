/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('layer_construction', {
    id_layer_construction: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
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
    open_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '开井压力[MPa]'
    },
    total_fluid: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '总液量[m^3]'
    },
    slip_fluid_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '滑溜水[m^3]'
    },
    linear_gum_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '线性胶[m^3]'
    },
    weak_crosslinked_fluid_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '弱交联液[m^3]'
    },
    acid_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '酸量[m^3]'
    },
    total_proppant: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '总砂量[ton]'
    },
    mesh_silt_100_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '100目粉砂[ton]'
    },
    mesh_silt_40_70_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '40,70目粉砂[ton]'
    },
    mesh_ceramsite_40_70_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '40,70目陶粒[ton]'
    },
    mesh_ceramsite_20_40_amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '20,40目陶粒[ton]'
    },
    max_proppant_concentration: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最高砂浓[kg/m^3]'
    },
    max_delivery: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最高排量[m^3/min]'
    },
    min_delivery: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最低排量[m^3/min]'
    },
    avg_delivery: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '平均排量[m^3/min]'
    },
    max_wellhead_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最高井口压力[MPa]'
    },
    min_wellhead_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最低井口压力[MPa]'
    },
    avg_wellhead_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '平均井口压力[MPa]'
    },
    pumpoff_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '停泵压力[MPa]'
    },
    work_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: '日期'
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '开始'
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '结束'
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
    tableName: 'layer_construction'
  });
};
