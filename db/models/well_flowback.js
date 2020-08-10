/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_flowback', {
    id_well_flowback: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    well: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '井',
      references: {
        model: {
          tableName: 'well_info',
        },
        key: 'id_well_info'
      }
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '返排时间'
    },
    wellhead_tubingpressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '井口油压[MPa]'
    },
    Daniell_temprature: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '丹尼尔温度[℃]'
    },
    Daniell_pressure_diff: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '丹尼尔压差[inH2O]'
    },
    Daniell_downward_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '丹尼尔下压[MPa]'
    },
    net_flowback: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '净排液[m^3]'
    },
    cumulative_flowback: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '累净排[m^3]'
    },
    glib: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '油嘴[mm]'
    },
    orifice: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '孔板[mm]'
    },
    instant_gas_outcome: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '瞬时气量[10^4m^3/d]'
    },
    cumulative_gas_outcome: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '累计产气量[10^4m^3]'
    },
    left_fluid: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '余液[m^3]'
    },
    flowback_ratio: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '返排率[%]'
    },
    chloride: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '氯根[mg/L]'
    },
    wellhead_casingpressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '井口套压[MPa]'
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
    tableName: 'well_flowback'
  });
};
