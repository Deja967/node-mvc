require('dotenv').config();

module.exports = {
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  dialect: process.env.DIALECT,
  multipleStatements: process.env.MULTIPLE_STATEMENTS,
};
