/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_section_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    wellsection: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链至proc_well_section',
      references: {
        model: {
          tableName: 'proc_well_section',
        },
        key: 'id'
      }
    },
    index: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '段序'
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
    tableName: 'proc_well_section_detail'
  });
};
