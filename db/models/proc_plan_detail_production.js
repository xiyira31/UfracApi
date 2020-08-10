/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_plan_detail_production', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    well_plan_detail: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链到proc_plan_detail_fracture_result',
      references: {
        model: {
          tableName: 'proc_well_plan_detail',
        },
        key: 'id'
      }
    },
    matrix_porosity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '基质孔隙度(nD)'
    },
    matrix_permeability: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '基质渗透率(%)'
    },
    fracture_porosity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝孔隙度(nD)'
    },
    fracture_permeability: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝渗透率(%)'
    },
    well_bottom_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '井底流压(MPa)'
    },
    gas_content: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '含气量(m³/t)'
    },
    grid_width: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '网格宽度(m)'
    },
    grid_thickness: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '网格厚度(m)'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'proc_plan_detail_production'
  });
};
