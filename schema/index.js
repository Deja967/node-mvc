const dbConfig = require('../config/db.config');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    define: {
      freezeTableName: true,
    },
    sync: true,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

const db = {};
db.sequelize = sequelize;
db.sequelize = sequelize;

db.user = require('./user.schema')(sequelize, Sequelize.DataTypes);
db.address = require('./user.address.schema')(sequelize, Sequelize.DataTypes);

db.user.hasMany(db.address);
db.address.belongsTo(db.user);

module.exports = db;
