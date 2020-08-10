/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_plan_detail_fracture_result', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    well_plan_detail: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链到proc_well_plan_detail',
      references: {
        model: {
          tableName: 'proc_well_plan_detail',
        },
        key: 'id'
      }
    },
    youngs: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '杨氏模量(GPa)'
    },
    poisson_ratio: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '泊松比'
    },
    max_stress: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大水平主应力(MPa)'
    },
    min_stress: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最小水平主应力(MPa)'
    },
    time_step: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '步长'
    },
    frac_height: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '缝高(m)'
    },
    up_layer_stress_diff: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '盖层应力差(MPa)'
    },
    low_layer_stress_diff: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '底层应力差(MPa)'
    },
    perforation_height: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '射孔长度(m)'
    },
    up_layer_k1c: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '盖层断裂韧性(MPa.m^0.5)'
    },
    low_layer_k1c: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '底层断裂韧性(MPa.m^0.5)'
    },
    pay_zone: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '半有效地层厚度(m)'
    },
    up_layer_youngs: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '盖层杨氏模量(GPa)'
    },
    low_layer_youngs: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '底层杨氏模量(GPa)'
    },
    DFN: {
      type: 'LONGTEXT',
      allowNull: true,
      comment: '天然裂缝'
    },
    frapres: {
      type: 'LONGTEXT',
      allowNull: true,
      comment: '缝间压力'
    },
    fraWidth: {
      type: 'LONGTEXT',
      allowNull: true,
      comment: '裂缝缝宽'
    },
    prop: {
      type: 'LONGTEXT',
      allowNull: true,
      comment: '砂浓度'
    },
    well_pres: {
      type: 'LONGTEXT',
      allowNull: true,
      comment: '井底压力'
    },
    reform_area: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '改造面积(㎡)'
    },
    sustain_area: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '支撑面积(㎡)'
    },
    valid_ratio: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '有效比例'
    },
    l1: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '半缝长L1(m)'
    },
    l2: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '半缝长L2(m)'
    },
    lw: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '缝宽(m)'
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
    tableName: 'proc_plan_detail_fracture_result'
  });
};
