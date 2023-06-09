const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {

  const authToken = "Bearer " + req.body.userKey;
  // const authToken = req.headers.authorization || req.headers.Authorization;
  let token;

  if (authToken && authToken.startsWith('Bearer ')) {
    token = authToken.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  jwt.verify(token, process.env.ACCESS_KEY, (err, decoded) => {
    if (err) {
      // Token has expired or is invalid
      return res.json({ isValid: false });
    } else {
      // Token is valid

      // req.user = decoded.user; // Set the decoded user on the request object for further use
      return res.json({ userName: decoded.user.userName, isValid: true });
      
    }
  });

  next();
};

module.exports = verifyToken;
