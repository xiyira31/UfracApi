/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_gas_survey', {
    id_gas_survey: {
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
    E_C: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'EC[%]'
    },
    C1: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'C1[%]'
    },
    C2_main: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'C2[%]'
    },
    C3_main: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'C3[%]'
    },
    iC4_main: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'iC4[%]'
    },
    nC4_main: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'nC4[%]'
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
    tableName: 'well_gas_survey'
  });
};
