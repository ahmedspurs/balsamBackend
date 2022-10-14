const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Icus extends Model {}
Icus.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    hospitalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "hospitals",
        key: "id",
      },
      field: "hospital_id",
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "name",
    },
    status: {
      type: Sequelize.INTEGER(1),
      allowNull: false,
      field: "status",
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      field: "price",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "createdAt",
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "updatedAt",
    },
  },
  {
    sequelize,
    modelName: "Icus",
    freezeTableName: true,
    timestamps: false,
  }
);

Icus.associate = ({ Hospitals }) => {
  Icus.belongsTo(Hospitals, {
    foreignKey: "hospitalId",
    as: "hospital",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
module.exports = () => Icus;
