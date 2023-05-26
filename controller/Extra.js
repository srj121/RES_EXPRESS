<<<<<<< HEAD
const asyncHandler = require('express-async-handler')
const logger = require('../logger/logger');
const { userclient, connectToDatabase } = require("../configurations/db");


//_________________________________CONNECTION TO PORT_________________________________

const reconnect = asyncHandler(async (req, res) => {
  try {

    await userclient.close() // Close the existing connection
    console.log('connection closed')
    await connectToDatabase() // Connect to the database again
    console.log('connected to DB')
    
    res.status(200).json({message: 'Successfully reconnected to the database'});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error reconnecting to the database'});
  }
});
module.exports = {
  reconnect
=======
<<<<<<< HEAD
const asyncHandler = require('express-async-handler')
const logger = require('../logger/logger');
const { userclient, connectToDatabase } = require("../configurations/db");


//_________________________________CONNECTION TO PORT_________________________________

const reconnect = asyncHandler(async (req, res) => {
  try {

    await userclient.close() // Close the existing connection
    console.log('connection closed')
    await connectToDatabase() // Connect to the database again
    console.log('connected to DB')
    
    res.status(200).json({message: 'Successfully reconnected to the database'});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error reconnecting to the database'});
  }
});
module.exports = {
  reconnect
=======
const asyncHandler = require('express-async-handler')
const logger = require('../logger/logger');
const { userclient, connectToDatabase } = require("../configurations/db");


//_________________________________CONNECTION TO PORT_________________________________

const reconnect = asyncHandler(async (req, res) => {
  try {

    await userclient.close() // Close the existing connection
    console.log('connection closed')
    await connectToDatabase() // Connect to the database again
    console.log('connected to DB')
    
    res.status(200).json({message: 'Successfully reconnected to the database'});
  } catch (err) {
    console.error(err);
    res.status(500).json({message: 'Error reconnecting to the database'});
  }
});
module.exports = {
  reconnect
>>>>>>> 5255d0555189735353da1b65e8a7dc4945f78324
>>>>>>> ff36c35ea7f8da5a3e12ccdcc3af749dc5c7116b
}