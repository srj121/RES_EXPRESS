const asyncHandler = require("express-async-handler");
const logger = require("../logger/logger");
const { userclient } = require("../configurations/db");
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const authUser = require("../model/AuthUser");
const authCollection = userclient.db("RES").collection("auth");
//____________________________________POST AUTH ADDUSER_______________________________________
const addAuthUser = asyncHandler(async (req, res) => {
  try {
    const { ObjectId } = require("mongodb");
    
    const {  password, id } = req.body;
  
    const objectId = new ObjectId(String(id));

    let encrypted = await bcrypt.hash(password, 10);

    const filter = { _id: objectId }; // Filter by ID

    const update = {
      $set: { password: encrypted },
    };

    const updatedUser = await authCollection.updateOne(filter, update);

    if (updatedUser.modifiedCount === 1) {
      res.status(200).json({ message: "Auth User Updated!" });
    } else {
      res.status(400).json({ message: "Document not found or update failed." });
    }
  } catch (err) {
    res.status(500).json({ message: "Error updating document" });
    logger.error("Error updating document");
  }
});


//____________________________________ getUserData _______________________________________
const getUserData = asyncHandler(async(req, res) => {

  try {
    const userName = req.body.userName;
    const user = await authCollection.findOne({userName: userName})
    res.json({ message: " got updated user ", user: user})
  } catch (err) {
    res.status(500).json({ message: "Error finding user" });
  }
})


//____________________________________AUTH LOGINUSER_______________________________________

const findAuthUser = asyncHandler(async (req, res) => {
  const user = req.body;
  const userName = user.userName;
  const password = user.password;
  try {
    const user = await authCollection.findOne({ userName: userName });
    if (user === null) {
      res.status(400).json({ message: "user not found" });
    }
    else {
      let dbPassword = user.password;
      if (!await bcrypt.compare(password, dbPassword)) {
        res.status(401).send({ message: "Invalid password" });
        logger.info("password is not valid");
      } else {
        logger.info("password is valid ");

        const accessToken = jwt.sign(
          { user },
          process.env.ACCESS_KEY,
          { expiresIn: '1d' });
        res.json({ key: accessToken});
      }
    }
  } catch (err) {
    res.status(500).send({ message: "Error getting document" });
    logger.error("Error getting document");
  }
});

//____________________________________GET EMAIL_______________________________________

const allEmails = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await authCollection.findOne({ email: email });

    if (user == null) {
      res.status(200).json({ message: "user email is not found" });
      logger.info("Email is Available");
    }
    else if (user.email === email) {
      res.status(401).json({ message: "Email is used take another" });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "Error getting document" });
    logger.info("Error getting document");
  }
});
//____________________________________GET USERNAME_______________________________________

const allUserName = asyncHandler(async (req, res) => {
  const { userName } = req.body;

  try {
    const user = await authCollection.findOne({ userName: userName });

    if (user == null) {
      res.status(200).json({ message: "user name is not found" });
      logger.info("UserName is Available");
    }
    else if (user.userName === userName) {
      res.status(401).json({ message: "User name is used take another" });
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "Error getting document" });
    logger.info("Error getting document");
  }
});
//____________________________________GET ALL SUBSCRIBER_______________________________________

const allSubscribers = asyncHandler(async (req, res) => {
  try {
    const count = await authCollection.countDocuments();
    res.json(count);

  } catch (err) {
    res.status(500).json({ message: "Error retreving count" });

  }

})


module.exports = {
  addAuthUser,
  getUserData,
  findAuthUser,
  allEmails,
  allUserName,
  allSubscribers
};
