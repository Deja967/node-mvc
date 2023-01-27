const { add } = require('lodash');
const db = require('../schema');
const short = require('short-uuid');

const User = db.db.user;
const Address = db.db.address;
const sequelize = db.db.sequelize;

module.exports = class UserAddressRepository {
  async addAddress(email, address) {
    const sqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    try {
      const user = await Address.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        return 'user doesnt exist in db';
      }
      const response = await sequelize.query(
        `INSERT INTO address (id, address, unit, city, state, zip_code, createdAt, updatedAt, userInformationId) VALUES ("${short.generate()}", "${
          address[0].address
        }", "${address[0].unit}", "${address[0].city}", "${
          address[0].state
        }", "${address[0].zip_code}", "${sqlDate}", "${sqlDate}"
          )}", (SELECT id FROM userinformation WHERE email = "${email}"))`
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }
};
