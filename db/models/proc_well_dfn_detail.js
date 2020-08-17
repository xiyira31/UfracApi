/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_dfn_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    dfn: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'proc_well_dfn',
        },
        key: 'id'
      }
    },
    x: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '测深位置(m)'
    },
    y: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '距井筒距离(m)'
    },
    theta: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '倾角(°)'
    },
    length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '长度(m)'
    },
    is_auto: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 0,
      comment: '是否是自动生成的'
    }
  }, {
    sequelize,
    tableName: 'proc_well_dfn_detail'
  });
};
