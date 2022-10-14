const sequelize = require("../config/env.js");
const Sequelize = require("sequelize");
const Model = Sequelize.Model;

class Bookings extends Model {}
Bookings.init({
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    hospitalId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'hospital_id'
    },
    icuId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'icu_id'
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      field: 'user_id'
    },
    phone: {
      type: Sequelize.STRING(14),
      allowNull: false,
      field: 'phone'
    },
    address: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'address'
    },
    status: {
      type: Sequelize.STRING(255),
      allowNull: false,
      field: 'status'
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'createdAt'
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updatedAt'
    }
  }, {
    sequelize,
    modelName: 'Bookings',
    freezeTableName: true,
    timestamps: false
  }
);


      Bookings.associate = (db) => {
        
      };
      module.exports = () =>Bookings;
