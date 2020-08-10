/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_produce_log', {
    id_well_produce_log: {
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
    produce_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: '生产日期'
    },
    daily_water: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '日产水[m^3/d]'
    },
    daily_gas: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '日产气[10^4m^3/d]'
    },
    pipe_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '套压[Mpa]'
    },
    tube_pressure: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '油压[Mpa]'
    },
    work_rule: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '生产制度'
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
    tableName: 'well_produce_log'
  });
};
