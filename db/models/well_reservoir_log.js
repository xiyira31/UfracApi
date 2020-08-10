/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_reservoir_log', {
    id_well_reservoir_log: {
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
    valid_porosity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '有效孔隙度[%]'
    },
    permeability: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '渗透率[nD]'
    },
    TOC: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'TOC[%]'
    },
    total_gas_content: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '总含气量[m^3/ton]'
    },
    gamma: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '伽马[GAPI]'
    },
    density: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '密度[g/cm^3]'
    },
    neutron: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '中子[%]'
    },
    specitic_resistance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '电阻率[ohmm]'
    },
    clay_content: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '粘土含量[%]'
    },
    kiesel_content: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '硅质含量[%]'
    },
    carbonate_content: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '碳酸盐岩含量[%]'
    },
    pyrite_content: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '黄铁矿含量[%]'
    },
    Si_water: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '含水饱和度[%]'
    },
    QFRE: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '游离气量[m^3/ton]'
    },
    QSOR: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '吸附气含量[m^3/ton]'
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
    tableName: 'well_reservoir_log'
  });
};
