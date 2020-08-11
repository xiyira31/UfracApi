/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_quatity_detail', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    well_quatity: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: {
          tableName: 'proc_well_quatity',
        },
        key: 'id'
      }
    },
    md: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    value: {
      type: DataTypes.DECIMAL,
      allowNull: true
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
    tableName: 'proc_well_quatity_detail'
  });
};
