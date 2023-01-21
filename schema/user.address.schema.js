module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('address', {
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
    addressId: {
      type: DataTypes.STRING,
    },
  });
  return Address;
};
