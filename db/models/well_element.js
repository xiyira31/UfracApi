/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('well_element', {
    id_well_element: {
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
      comment: '测深'
    },
    Na: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Na'
    },
    Mg: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Mg'
    },
    Al: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Al'
    },
    Si: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Si'
    },
    P: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'P'
    },
    S: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'S'
    },
    Cl: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Cl'
    },
    K: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'K'
    },
    Ca: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Ca'
    },
    Ti: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Ti'
    },
    V: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'V'
    },
    Cr: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Cr'
    },
    Mn: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Mn'
    },
    Ni: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Ni'
    },
    Zn: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Zn'
    },
    Cu: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Cu'
    },
    As: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'As'
    },
    Pb: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Pb'
    },
    Sr: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Sr'
    },
    Zr: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Zr'
    },
    Nb: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Nb'
    },
    Sn: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Sn'
    },
    Ag: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Ag'
    },
    Cd: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Cd'
    },
    Ba: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Ba'
    },
    Fe: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      comment: 'Fe'
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      comment: '创建时间'
    },
    tag: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 1,
      comment: '有效标志'
    }
  }, {
    sequelize,
    tableName: 'well_element'
  });
};
