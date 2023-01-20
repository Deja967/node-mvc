module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('userInformation', {
    first_name: {
      type: DataTypes.STRING,
    },
    last_name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    date_of_birth: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.STRING,
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