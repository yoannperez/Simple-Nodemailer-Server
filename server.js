const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require("cors");
require("dotenv").config();

// middleware
app.use(express.json());
app.use(cors());

let transporter = nodemailer.createTransport({
  pool: true,
  host: process.env.HOST,
  port: process.env.PORT,
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
    subject: `Message from: ${req.body.mailerState.email}`,
    text: `${req.body.mailerState.message}`,
    date: new Date("2000-01-01 00:00:00"),
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

// Start Node Express Server
const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
