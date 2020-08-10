/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_dfn', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    well: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外键到well_info',
      references: {
        model: {
          tableName: 'well_info',
        },
        key: 'id_well_info'
      }
    },
    avg_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝平均长度(m)'
    },
    angle: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝倾斜角(°)'
    },
    density: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝密度'
    },
    start: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '开始点(m)'
    },
    end: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '结束点(m)'
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: true,
      comment: '名称'
    },
    y_offset: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最远裂缝距离(m)'
    },
    angle_offset: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '裂缝角度偏差(°)'
    },
    min_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最小裂缝长度(m)'
    }
  }, {
    sequelize,
    tableName: 'proc_well_dfn'
  });
};
