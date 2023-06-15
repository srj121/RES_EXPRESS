const asyncHandler = require("express-async-handler");
const logger = require("../logger/logger");
const { userclient } = require("../configurations/db");
const bcrypt= require("bcrypt")
const crypto = require("crypto");
const authUser = require("../model/AuthUser");
const authCollection = userclient.db("RES").collection("auth");
//____________________________________POST AUTH ADDUSER_______________________________________
const addAuthUser = asyncHandler(async (req, res) => {
  try {
    const { email, name, password } = req.body;

    console.log(email, name, password)

    // const algorithm = "aes-256-cbc";
    // const key = crypto.scryptSync(password.password, "salt", 32);
    // const iv = crypto.randomBytes(16);

    // console.log('it ok here')

    // const cipher = crypto.createCipheriv(algorithm, key, iv);
    // let encrypted = cipher.update(password.password, "utf8", "hex");
    // encrypted += cipher.final("hex");
    console.log("here")
    console.log(password.password)
    
    let encrypted = await bcrypt.hash(password.password, 10)
    console.log(encrypted)
    

    const newAuthUser = new authUser({
      email: email.email,
      name: name.name,
      password: encrypted
      // iv: iv.toString("hex"),
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
  // const { name, password } = req.body;
  const user = req.body;
  const name = user.userName;
  const password = user.password;

  try {

    const user = await authCollection.findOne({ name: name });
    if (user === null) {
      res.status(400).json({ message: "user not found" });
    }
    else{

    let dbPassword = user.password;
      console.log("1")
    // const algorithm = "aes-256-cbc";
    // const key = crypto.scryptSync(password, "salt", 32);
    // const iv = Buffer.from(user.iv, "hex");
    // const decipher = crypto.createDecipheriv(algorithm, key, iv);
    // let decrypted = decipher.update(dbPassword, "hex", "utf8");
    // decrypted += decipher.final("utf8");
    // console.log("Decrypted password:", decrypted);

    // bcrypt.compare(password, dbPassword)
    console.log("2")

    if (!await bcrypt.compare(password, dbPassword)) {
      res.status(400).send({ message: "Invalid password " });
      logger.info("password is not valid ");
    }
    // res.status(200).send({ message: "user password is matched " });
    const sanitizedUser = {
      id: user._id,
      email: user.email,
      name: user.name
    }
    console.log(user)
    res.status(200).send(sanitizedUser);
    logger.info("password is valid ");
  }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "Error getting document" });
    logger.info("Error getting document");
  }
});

//____________________________________GET EMAIL_______________________________________

const allEmails = asyncHandler(async (req, res) => {
  const { email } = req.body;

  try {
    const user = await authCollection.findOne({ email: email });
    
    if(user == null) {
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
  const { name } = req.body;
  
  try {
    const user = await authCollection.findOne({ name: name });
    
    if(user == null) {
      res.status(200).json({ message: "user name is not found" });
      logger.info("UserName is Available");
    }
    else if (user.name === name) {
      res.status(401).json({ message: "User name is used take another"});
    }
  } catch (err) {
    logger.error(err);
    res.status(500).send({ message: "Error getting document" });
    logger.info("Error getting document");
  }
});
//____________________________________GET ALL SUBSCRIBER_______________________________________

const allSubscribers = asyncHandler(async (req, res) => {
  try{ 
  const count = await authCollection.countDocuments();
  console.log("count of all subsCribers = " + count);
  res.json(count);

  }catch(err){
    console.log(err);
    res.status(500).json({message: "Error retreving count"});

  }

})


module.exports = {
  addAuthUser,
  findAuthUser,
  allEmails,
  allUserName,
  allSubscribers
};
