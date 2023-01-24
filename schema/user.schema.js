const { Sequelize } = require('sequelize');
const short = require('short-uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('userInformation', {
    id: {
      allowNull: false,
      defaultValue: short.generate(),
      primaryKey: true,
      type: DataTypes.STRING,
    },
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    phone: {
      type: DataTypes.STRING,
    },
    last_login: {
      type: DataTypes.DATE,
    },
  });
  return User;
};
