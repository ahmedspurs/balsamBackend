const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Hospitals extends Model {
  toJSON() {
    return { ...this.get(), password: undefined };
  }
}
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

Hospitals.associate = ({ Icus, Clinics, Bookings, Appointments }) => {
  Hospitals.hasMany(Icus, {
    foreignKey: "hospitalId",
    as: "icus",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Hospitals.hasMany(Clinics, {
    foreignKey: "hospitalId",
    as: "clinics",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Hospitals.hasMany(Bookings, {
    foreignKey: "hospitalId",
    as: "bookings",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Hospitals.hasMany(Appointments, {
    foreignKey: "hospitalId",
    as: "appointments",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
module.exports = () => Hospitals;
