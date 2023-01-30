const { Sequelize } = require('sequelize');
const short = require('short-uuid');

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
    id: {
      allowNull: false,
      defaultValue: short.generate(),
      primaryKey: true,
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    unit: {
      type: DataTypes.INTEGER,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip_code: {
      type: DataTypes.INTEGER,
    },
  });
  return Address;
};
