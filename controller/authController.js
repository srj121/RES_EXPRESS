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
    const { email, name, password } = req.body;

    let encrypted = await bcrypt.hash(password.password, 10)

    const newAuthUser = new authUser({
      email: email.email,
      name: name.name,
      password: encrypted
    });
    const savedUser = await authCollection.insertOne(newAuthUser);
    logger.info(savedUser);
    res.status(200).json({ message: "Auth User Added!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error inserting document" });
    logger.error("Error inserting document");
  }
});

//____________________________________AUTH LOGINUSER_______________________________________

const findAuthUser = asyncHandler(async (req, res) => {
  const user = req.body;
  const name = user.userName;
  const password = user.password;

  try {

    const user = await authCollection.findOne({ name: name });
    if (user === null) {
      res.status(400).json({ message: "user not found" });
    }
    else {
      let dbPassword = user.password;
      if (!await bcrypt.compare(password, dbPassword)) {
        res.status(401).send({ message: "Invalid password " });
        logger.info("password is not valid ");
      } else {
        logger.info("password is valid ");

        const accessToken = jwt.sign(
          { user },
          process.env.ACCESS_KEY,
          { expiresIn: '30m' });
        res.json({ key: accessToken });
      }
    }
  } catch (err) {
    console.log(err);
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
    console.log(err);
    logger.error(err);
    res.status(500).send({ message: "Error getting document" });
    logger.info("Error getting document");
  }
});
//____________________________________GET USERNAME_______________________________________

const allUserName = asyncHandler(async (req, res) => {
  const { name } = req.body;

  try {
    const user = await authCollection.findOne({ name: name });

    if (user == null) {
      res.status(200).json({ message: "user name is not found" });
      logger.info("UserName is Available");
    }
    else if (user.name === name) {
      res.status(401).json({ message: "User name is used take another" });
    }
  } catch (err) {
    console.log(err);
    logger.error(err);
    res.status(500).send({ message: "Error getting document" });
    logger.info("Error getting document");
  }
});
//____________________________________GET ALL SUBSCRIBER_______________________________________

const allSubscribers = asyncHandler(async (req, res) => {
  try {
    const count = await authCollection.countDocuments();
    console.log("count of all subsCribers = " + count);
    res.json(count);

  } catch (err) {
    console.log(err);
    console.log(err);
    res.status(500).json({ message: "Error retreving count" });

  }

})


module.exports = {
  addAuthUser,
  findAuthUser,
  allEmails,
  allUserName,
  allSubscribers
};
