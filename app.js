const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();




// enable https when proxy on server
app.enable('trust proxy')

// middleware
app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.HOST,
  port: process.env.SMTPPORT,
  secure: true, // upgrade later with STARTTLS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.WORD,
  },
});

transporter.verify((err, success) => {
  err ? console.log(err) : console.log(`=== Server is ready to take messages: ${success} ===`);
});

// Route for sending mail
app.post("/send", function (req, res) {

  let mailOptions = {
    from: `${req.body.mailerState.email}`,
    to: process.env.EMAIL,
    subject: `Message from: ${req.body.mailerState.email} FORMULAIRE`,
    text: `${req.body.mailerState.message}`,
    date: new Date(),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      res.json({
        status: "fail",
      });
    } else {
        console.log("== Message Sent ==");
        res.json({
          status: "success",
        });
    }
  });
});

module.exports = app;

