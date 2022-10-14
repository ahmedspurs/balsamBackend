const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Hospitals extends Model {}
Hospitals.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    name: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "name",
    },
    email: {
      type: Sequelize.STRING(255),
      allowNull: false,
      unique: true,
      field: "email",
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "password",
    },
    license: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "license",
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "address",
    },
    phone: {
      type: Sequelize.STRING(14),
      allowNull: false,
      field: "phone",
    },
    type: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "type",
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
    modelName: "Hospitals",
    freezeTableName: true,
    timestamps: false,
  }
);

Hospitals.associate = (db) => {};
module.exports = () => Hospitals;
