/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('base_frac_fluid', {
    id_base_frac_fluid: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    frac_fluid_name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '名称'
    },
    frac_fluid_format: {
      type: DataTypes.STRING(512),
      allowNull: true,
      comment: '规格'
    },
    frac_fluid_density: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '密度[g/cm^3]'
    },
    frac_fluid_kine_visc: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '运动粘度[m^2/s]'
    },
    frac_fluid_dyna_visc: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '动力粘度[mPa·s]'
    },
    frac_fluid_flow_index: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '流动指数'
    },
    frac_fluid_cons_index: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '稠度系数'
    },
    frac_fluid_fric_1000m: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '每千米摩阻[Mpa]'
    },
    frac_fluid_fric_redu_rate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '降阻率'
    },
    frac_fluid_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '压裂液每方价格[Yuan/m^3]'
    },
    frac_fluid_producer: {
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
    tableName: 'base_frac_fluid'
  });
};
