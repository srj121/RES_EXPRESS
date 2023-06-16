const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
console.log('1')
const authToken = req.headers.authorization || req.headers.Authorization;
let token;
if (authToken && authToken.startsWith('Bearer')) {
  console.log('2')
  token = authToken.split(' ')[1];
  console.log(token)
}
if (!token) {
  console.log('3')
  return res.status(401).json({ message: 'Missing token' });
}
jwt.verify(token, process.env.ACESS_KEY, (err, decoded) => {
  console.log(decoded)

  if (err) {
    console.log('4')
    return res.status(401).json({ message: 'Invalid token' });
  }
  console.log('5')
  // res.user = decoded.user;
  return res.json(decoded.user);
  });
  next();
};
module.exports = verifyToken;
