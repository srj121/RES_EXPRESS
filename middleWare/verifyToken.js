const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  console.log("in verify")

const authToken ="Bearer "+ req.body.userKey;
  
// const authToken = req.headers.authorization || req.headers.Authorization;
console.log(authToken)
let token;
if (authToken && authToken.startsWith('Bearer')) {
  token = authToken.split(' ')[1];
  console.log(token)
}
if (!token) {
  return res.status(401).json({ message: 'Missing token' });
}
jwt.verify(token, process.env.ACESS_KEY, (err, decoded) => {
  console.log(decoded)

  if (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  return res.json(decoded.user);
  });
  next();
};
module.exports = verifyToken;
