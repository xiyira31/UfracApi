/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_trace', {
    id_well_trace: {
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
    deviation: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '井斜角'
    },
    azimuth: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '方位角'
    },
    vd: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '垂深[m]'
    },
    north: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '北坐标'
    },
    east: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '东坐标'
    },
    dogleg: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '狗腿度[deg/30m]'
    },
    close_distance: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '闭合距[m]'
    },
    pseudo_translate: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '视平移[m]'
    },
    close_azimuth: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '闭合方位[deg]'
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
    tableName: 'well_trace'
  });
};
