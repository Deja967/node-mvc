const short = require('short-uuid');

const addUserAddress = (email, address) => {
  const sqlDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
  return `INSERT INTO address (id, address, unit, city, state, zip_code, createdAt, updatedAt, userInformationId) VALUES ("${short.generate()}", "${
    address[0].address
  }", "${address[0].unit}", "${address[0].city}", "${address[0].state}", "${
    address[0].zip_code
  }", "${sqlDate}", "${sqlDate}", (SELECT id FROM userinformation WHERE email = "${email}"))`;
};

module.exports = { addUserAddress };
