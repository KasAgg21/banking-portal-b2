const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');


const storage = multer.memoryStorage();
const upload = multer({ storage });

dotenv.config();
const app = express();
const port = process.env.PORT || 5000; 

const userbase = require('./Routes/userdata');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'your-email@gmail.com',
      pass: 'your-password'
  }
});

mongoDB();

app.use(cors());
app.use(express.json());

app.use('/userbase', userbase);

app.post('/api/send-email', upload.single('pdf'), (req, res) => {
  const mailOptions = {
      from: 'your-email@gmail.com',
      to: 'recipient-email@example.com',
      subject: 'Account Statement',
      text: 'Please find attached the account statement.',
      attachments: [
          {
              filename: 'account_statement.pdf',
              content: req.file.buffer,
              encoding: 'base64'
          }
      ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error sending email:', error);
          res.status(500).send('Failed to send email');
      } else {
          console.log('Email sent:', info.response);
          res.send('Email sent successfully');
      }
  });
});

app.listen(port, function () {
  console.log("Server Started at ", port);
});
