/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_info', {
    id_well_info: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '编号'
    },
    platform: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '平台',
      references: {
        model: {
          tableName: 'enum_platform',
        },
        key: 'id_enum_platform'
      }
    },
    type: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '井型'
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '井号'
    },
    own_company: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '所属公司'
    },
    md: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '测深[m]'
    },
    vd: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '垂深[m]'
    },
    earth_x: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '大地坐标X[m]'
    },
    earth_y: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '大地坐标Y[m]'
    },
    altitude: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '地面海拔[m]'
    },
    kelly_bushing: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '补心海拔[m]'
    },
    main_layer: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '主要产层'
    },
    reservoir_lithology: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '储层岩性'
    },
    A_point: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'A点[m]'
    },
    B_point: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'B点[m]'
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
    tableName: 'well_info'
  });
};
