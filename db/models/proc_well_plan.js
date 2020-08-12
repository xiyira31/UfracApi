/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('proc_well_plan', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      comment: '主键'
    },
    user: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: '用户'
    },
    well: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      comment: '外键到well_info',
      references: {
        model: {
          tableName: 'well_info',
        },
        key: 'id_well_info'
      }
    },
    well_quatity: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      comment: '外键到proc_well_quatity',
      references: {
        model: {
          tableName: 'proc_well_quatity',
        },
        key: 'id'
      }
    },
    locked: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 0,
      comment: '是否被锁，0为否'
    },
    deleted: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 0,
      comment: '是否被删除，0为否'
    },
    name: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: '方案名称'
    },
    statement: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: 1,
      comment: '1-储层质量评价；2-分段方案设计；3-缝网预测；4-产能预测；5-方案归档'
    },
    update_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '更新于'
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: '删除于'
    },
    create_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建于'
    }
  }, {
    sequelize,
    tableName: 'proc_well_plan'
  });
};
