// Create token
const jwt = require('jsonwebtoken');
module.exports = generateToken = async (payload) => {
  const token =  jwt.sign(payload, process.env.TOKEN_KEY ,{

    expiresIn: "10h" 

});
  return token;
};
