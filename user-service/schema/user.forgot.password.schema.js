const { Sequelize } = require('sequelize');
const short = require('short-uuid');

module.exports = (sequelize, DataTypes) => {
  const ForgotPassword = sequelize.define('forgot_password', {
    id: {
      allowNull: false,
      defaultValue: short.generate(),
      primaryKey: true,
      type: DataTypes.STRING,
    },
    forgot_token: {
      type: DataTypes.STRING,
    },
    expiration_date: {
      type: DataTypes.DATE,
    },
  });
  return ForgotPassword;
};
