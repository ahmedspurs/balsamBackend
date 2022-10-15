const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Clinics extends Model {}
Clinics.init(
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
    domain: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "domain",
    },
    resume: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "resume",
    },
    attend: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "attend",
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false,
      field: "price",
    },
    phone: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "phone",
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
    modelName: "Clinics",
    freezeTableName: true,
    timestamps: false,
  }
);

Clinics.associate = ({ Hospitals }) => {
  Clinics.belongsTo(Hospitals, {
    foreignKey: "hospitalId",
    as: "hospital",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
module.exports = () => Clinics;
