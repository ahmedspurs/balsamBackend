const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Appointments extends Model {}
Appointments.init(
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
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      field: "user_id",
    },
    clinicId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "clinics",
        key: "id",
      },
      field: "clinic_id",
    },
    phone: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "phone",
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "address",
    },
    status: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: "wait",
      field: "status",
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "createdAt",
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      field: "updatedAt",
    },
  },
  {
    sequelize,
    modelName: "Appointments",
    freezeTableName: true,
    timestamps: false,
  }
);

Appointments.associate = ({ Users, Hospitals }) => {
  Appointments.belongsTo(Users, {
    foreignKey: "userId",
    as: "user",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
  Appointments.belongsTo(Hospitals, {
    foreignKey: "hospitalId",
    as: "hospital",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
module.exports = () => Appointments;
