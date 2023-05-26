const asyncHandler = require("express-async-handler");
const axios = require("axios");
const logger = require("../logger/logger");

const APIKEY =
  "FE46416FD25719F2FD282706DF5088D73B68C805E78007E9BDB0EF9D4083563DE8A4775FA076592203B91A5C019528DE";
const SUBJECT = "OTP For SignUp";

let randomNumber ;

const sendEmail = asyncHandler(async (req, res) => {
  try {
    randomNumber = generateRandomNumber();
    console.log("randomNumber = " + randomNumber);

    let BODY_TEXT =
      "you have request for an OTP for signing in. \nHere is your OTP \n\n" +
      randomNumber +
      "\n\n Copy it and get access";

      const { email } = req.body; // Using the setter method
    console.log('email = ' + email); // Using the getter method

    let data = "apikey=" + encodeURIComponent(APIKEY);
    data += "&from=" + encodeURIComponent("surajbade39.sb@gmail.com");
    data += "&fromName=" + encodeURIComponent("suraj Bade");
    data += "&subject=" + encodeURIComponent(SUBJECT);
    data += "&bodyText=" + encodeURIComponent(BODY_TEXT);
    data += "&to=" + encodeURIComponent(email);
    data += "&isTransactional=" + encodeURIComponent("false");

    console.log(data);

    axios
      .post("https://api.elasticemail.com/v2/email/send", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
      // res.json().sendStatus(200);
  } catch (error) {
    console.error(error);
    return "Unable to send email";
  }
});

function generateRandomNumber() {
  var min = 100000; // Minimum 6-digit number (inclusive)
  var max = 999999; // Maximum 6-digit number (inclusive)

  // Generate a random number between min and max
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

const OtpGen = asyncHandler(async (req, res) => {
  try {
    console.log("otp = " + randomNumber);
    const userOtp = Number(req.query.otp);
    console.log("otp from react = " + userOtp);
    if(userOtp !== randomNumber) {
    res.status(401).send("otp is incorrect");
    }
    else {
    res.status(200).send("otp is correct");
    }

  } catch (error) {
    console.error(error);
    return "Unable to send otp";
  }
});

module.exports = {
  sendEmail,
  OtpGen
};