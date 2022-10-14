const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Users extends Model {
  toJSON() {
    return { ...this.get(), password: undefined };
  }
}
Users.init(
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
    phone: {
      type: Sequelize.STRING(14),
      allowNull: false,
      field: "phone",
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "password",
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: "address",
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
    modelName: "Users",
    freezeTableName: true,
    timestamps: false,
  }
);

Users.associate = ({ Bookings }) => {
  Users.hasMany(Bookings, {
    foreignKey: "userId",
    as: "bookings",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
};
module.exports = () => Users;
