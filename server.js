const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
require("dotenv").config();

app.use(express.json());
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const extra = require("./routes/extraRoutes")
const elasticEmail = require("./routes/elasticEmailRoutes")

const { connectToDatabase } = require("./configurations/db");

connectToDatabase();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/", userRouter , authRouter, extra, elasticEmail);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
