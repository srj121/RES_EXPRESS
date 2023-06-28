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
    console.log(err);
    logger.error(err);
    process.exit(1);
  }
}

module.exports = {
  connectToDatabase,
  userclient,
};
