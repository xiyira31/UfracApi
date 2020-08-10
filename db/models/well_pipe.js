/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_pipe', {
    id_well_pipe: {
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
    pipe: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '套管类型'
    },
    top_md: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '测深顶界[m]'
    },
    bottom_md: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '测深底界[m]'
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
    tableName: 'well_pipe'
  });
};
