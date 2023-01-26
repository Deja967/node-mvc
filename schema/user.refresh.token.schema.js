const { DataTypes } = require('sequelize');
const short = require('short-uuid');
const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('refreshToken', {
    id: {
      allowNull: false,
      defaultValue: short.generate(),
      primaryKey: true,
      type: DataTypes.STRING,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  });
  return RefreshToken;
};
