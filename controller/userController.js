const asyncHandler = require('express-async-handler')
const logger = require('../logger/logger');
const { userclient } = require("../configurations/db");
const User = require('../model/User');
const userCollection = userclient.db("expressJs").collection("first");

//____________________________________GET ALL_______________________________________

const allUsers = asyncHandler(async (req, res) => {
    try {
      const users = await userCollection.find().toArray();
      res.json(users);
    } catch (err) {
      logger.error(err);
      logger.info("Error retrieving documents");
    }
  });


  //____________________________________GET BY NAME_______________________________________

  const getByName = asyncHandler(async (req, res) => {
    logger.info("get by Name");
    try {
      const userName = req.query.name;
  
      logger.info("userName = " + userName);
  
      const findByname = await userCollection.find({ name: userName }).toArray();
  
      if (findByname.length === 0) {
        logger.info(`Document with name { ${userName} } not found`);
        res.status(404).send(`Document with name { ${userName} } not found`);
      } else {
        res.json(findByname);
      }
    } catch (err) {
      logger.error(err);
      logger.info("Error retrieving document");
      res.status(500).send("Error retrieving document");
    }
  });
  
  //____________________________________GET BY AGE_______________________________________
  
  const getByAge = asyncHandler(async (req, res) => {
    logger.info("get by Age");
    try {
      const userAge = Number(req.body.age);
  
      logger.info("userAge = " + userAge);
  
      const findByage = await userCollection.find({ age: userAge }).toArray();
      if (findByage.length === 0) {
        res.status(404).send(`Document with age { ${userAge} } not found`);
        logger.info(`Document with age { ${userAge} } not found`);
      } else {
        res.json(findByage);
      }
    } catch (err) {
      logger.error(err);
      logger.info("Error retrieving document");
      res.status(500).send("Error retrieving document");
    }
  });
  
  //____________________________________DELETE BY ID_______________________________________
  
  const deleteById = asyncHandler(async (req, res) => {
  
    try {
      const { ObjectId } = require("mongodb");
  
      const number = req.body._id;
      const objectId = new ObjectId(String(number));
      logger.info(objectId);
  
      const result = await userCollection.deleteOne({ _id: objectId });
  
      if (result.deletedCount === 1) {
        res.json(result);
        logger.info("Document deleted successfully");
      } else {
        res.status(404).send("Document not found");
      }

    } catch (err) {
      res.status(400).send("Error retrieving document");
      logger.info("Error retrieving document");
    }
  });
  
  //____________________________________DELETE BY NAME_______________________________________
  
  const deletByName = asyncHandler(async (req, res) => {
    try {
      const name = req.body.name;
      logger.info(name);
      const result = await userCollection.deleteMany({ name: name });
  
      if (result.deletedCount > 0) {
        logger.info("Document deleted successfully");
        res.status(200).send({ count: result.deletedCount });
      } else {
        logger.info("Document not found");
        res.status(404).send("Document not found");
      }
    } catch (err) {
      logger.error(err);
      res.status(500).send("Error retrieving document");
    }
  });
  //____________________________________POST ADDUSER_______________________________________
  
  const addUser = asyncHandler(async (req, res) => {
    const { name, age, status } = req.body;
  
    const newUser = new User({
      name,
      age,
      status
    });
    console.log(name);
    console.log(age);
    console.log(status);
  
    try {
      if (age <= 0) {
        res.status(400).send("Age should not be less than 0");
      } else {
        const savedUser = await userCollection.insertOne(newUser);
        logger.info(savedUser);
        res.json(savedUser);
      }
    } catch (err) {
      logger.error(err);
      res.status(500).json({ message: "Error inserting document" });
      logger.info("Error inserting document");
    }
  });

  module.exports = {
    allUsers,
    getByName,
    getByAge,
    addUser,
    deletByName,
    deleteById
  }