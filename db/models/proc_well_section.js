/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_section', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: '分段方案名称'
    },
    section_max_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大段间距(m)'
    },
    section_min_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最小段间距(m)'
    },
    cluster_max_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最大簇间距(m)'
    },
    cluster_min_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '最小簇间距(m)'
    },
    cluster_num: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '簇数'
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
    perforation_length: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: '射孔长度(m)'
    },
    perforation_count_per_meter: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '每米孔数'
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
    },
    wellplan: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外链至proc_well_plan',
      references: {
        model: {
          tableName: 'proc_well_plan',
        },
        key: 'id'
      }
    },
    stats: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '任务状态0=未计算，1=计算中，2=完成'
    }
  }, {
    sequelize,
    tableName: 'proc_well_section'
  });
};
