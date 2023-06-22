const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Configure CORS options
// const corsOptions = {
//   origin: ['https://srj121.github.io', 'http://localhost:3000'],
//   optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
// };
app.use(cors());

// Adjust the limit of the request payload
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Increase the server timeout if needed
app.timeout = 120000; // 2 minutes in milliseconds


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000' || 'srj121.github.io/RES/');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use(express.json());
const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRoutes");
const extra = require("./routes/extraRoutes")
const elasticEmail = require("./routes/elasticEmailRoutes")
const verifyToken = require("./routes/varifyTokenRoutes")

// app.use((err, req, res, next) => {
//   // Handle payload size limit exceeded error
//   if (err instanceof SyntaxError && err.status === 413 && 'body' in err) {
//     res.status(413).json({ error: 'Payload size limit exceeded' });
//   } else {
//     // Handle other errors
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

const { connectToDatabase } = require("./configurations/db");

connectToDatabase();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use("/", userRouter , authRouter, extra, elasticEmail, verifyToken);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});
