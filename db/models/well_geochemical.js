/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_geochemical', {
    id_well_geochemical: {
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
    md: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '测深[m]'
    },
    lithology: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: '岩性'
    },
    sample: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: '样品类型'
    },
    S0: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'S0[mg/g]'
    },
    S1: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'S1[mg/g]'
    },
    S2: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'S2[mg/g]'
    },
    S4: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'S4[mg/g]'
    },
    Tmax: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Tmax[℃]'
    },
    D: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'D[%]'
    },
    HI: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'HI'
    },
    PG: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'PG'
    },
    OC: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '有机碳[%]'
    },
    OM_type: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: '有机质类型'
    },
    maturity: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '成熟度'
    },
    OM_abundance: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '有机质丰度'
    },
    adsorb_content: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '吸附含气量[m^3/ton]'
    },
    max_gas_generate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大生气量[m^3/ton]'
    },
    adsorb_gas_analysis: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      comment: '吸附气能力分析'
    },
    layer_analysis: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      comment: '目的层段分析'
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
    tableName: 'well_geochemical'
  });
};
