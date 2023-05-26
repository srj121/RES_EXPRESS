<<<<<<< HEAD
const { MongoClient } = require("mongodb");
const logger = require("../logger/logger");

const userclient = new MongoClient(process.env.MONGODB_URI_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await userclient.connect();

    logger.info("Connected to MongoDB Atlas");

  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase,
  userclient,
};
=======
<<<<<<< HEAD
const { MongoClient } = require("mongodb");
const logger = require("../logger/logger");

const userclient = new MongoClient(process.env.MONGODB_URI_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await userclient.connect();

    logger.info("Connected to MongoDB Atlas");

  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase,
  userclient,
};
=======
const { MongoClient } = require("mongodb");
const logger = require("../logger/logger");

const userclient = new MongoClient(process.env.MONGODB_URI_USER, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToDatabase() {
  try {
    await userclient.connect();

    logger.info("Connected to MongoDB Atlas");

  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase,
  userclient,
};
>>>>>>> 5255d0555189735353da1b65e8a7dc4945f78324
>>>>>>> ff36c35ea7f8da5a3e12ccdcc3af749dc5c7116b
