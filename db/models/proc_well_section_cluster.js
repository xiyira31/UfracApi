/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_section_cluster', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    wellsectiondetail: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链至proc_well_section_detail',
      references: {
        model: {
          tableName: 'proc_well_section_detail',
        },
        key: 'id'
      }
    },
    position: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '射孔点(m)'
    },
    perforation_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '射孔长度(m)'
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
    tableName: 'proc_well_section_cluster'
  });
};
