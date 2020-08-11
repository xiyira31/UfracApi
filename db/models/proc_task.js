/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_task', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    task_type: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '任务类型'
    },
    request_args: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '请求json'
    },
    response_args: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: '答复json'
    },
    stats: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '任务状态0=未计算，1=计算中，2=完成'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    start_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    finish_at: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'proc_task'
  });
};
