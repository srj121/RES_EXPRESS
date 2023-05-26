const asyncHandler = require("express-async-handler");
const logger = require("../logger/logger");
const { userclient } = require("../configurations/db");
const crypto = require("crypto");
const authUser = require("../model/AuthUser");
const authCollection = userclient.db("security").collection("auth");
//____________________________________POST AUTH ADDUSER_______________________________________
const addAuthUser = asyncHandler(async (req, res) => {
  try {
    const { email, name, password } = req.body;

    console.log(email, name, password)

    const algorithm = "aes-256-cbc";
    const key = crypto.scryptSync(password.password, "salt", 32);
    const iv = crypto.randomBytes(16);

    console.log('it ok here')

    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(password.password, "utf8", "hex");
    encrypted += cipher.final("hex");

    const newAuthUser = new authUser({
      email: email.email,
      name: name.name,
      password: encrypted,
      iv: iv.toString("hex"),
    });


    console.log("crossed 35", newAuthUser)
    const savedUser = await authCollection.insertOne(newAuthUser);
    console.log(savedUser)
    logger.info(savedUser);
    res.status(200).json({ message: "Auth User Added!" });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Error inserting document" });
    logger.info("Error inserting document");
  }
});

//____________________________________AUTH LOGINUSER_______________________________________

const findAuthUser = asyncHandler(async (req, res) => {
  const { email, name, password } = req.body;

  try {

    const user = await authCollection.findOne({ email: email });
    if (user.name !== name) {
      res.status(400).json({ message: "username is not matched" });
    }

    let dbPassword = user.password;

    const algorithm = "aes-256-cbc";
    const key = crypto.scryptSync(password, "salt", 32);
    const iv = Buffer.from(user.iv, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(dbPassword, "hex", "utf8");
    decrypted += decipher.final("utf8");
    console.log("Decrypted password:", decrypted);
    if (decrypted !== password) {
      res.status(400).send({ message: "Invalid password " });
      logger.info("password is not valid ");
    }
    res.status(200).send({ message: "user password is matched " });
    logger.info("password is valid ");
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "Error getting document" });
    logger.info("Error getting document");
  }
});

module.exports = {
  addAuthUser,
  findAuthUser,
};
