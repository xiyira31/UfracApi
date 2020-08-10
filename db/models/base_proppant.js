/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_proppant', {
    id_base_proppant: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    proppant_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '名称'
    },
    proppant_size_spec: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '粒径规格'
    },
    proppant_vol_density: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '体积密度[g/cm^3]'
    },
    proppant_appa_density: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '视密度[g/cm^3]'
    },
    proppant_comp_pres: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '抗压强度[MPa]'
    },
    proppant_break_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '破碎率[%]'
    },
    proppant_sphericity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '球度'
    },
    proppant_roundness: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '圆度'
    },
    proppant_acid_solu: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '酸溶解度'
    },
    proppant_turbidity: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '浊度'
    },
    proppant_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '单价[Yuan/ton]'
    },
    proppant_producer: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '生产商'
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
    tableName: 'base_proppant'
  });
};
