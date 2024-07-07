const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOtp = require('./Controller/user_controller');

const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(express.json());

// View engine setup
app.set('view engine', 'ejs');
app.set('views', './views');

// Routes setup
const userbase = require('./Routes/userdata');
app.use('/api', userbase);

const authRoute = require('./Routes/authRoute');
app.use('/', authRoute);

// MongoDB connection
mongoDB();

// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Route for sending email with PDF attachment
app.post('/api/send-email', upload.single('pdf'), (req, res) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'recipient-email@example.com',
    subject: 'Account Statement',
    text: 'Please find attached the account statement.',
    attachments: [
      {
        filename: 'account_statement.pdf',
        content: req.file.buffer,
        encoding: 'base64',
      },
    ],
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

// Start the server
app.listen(port, () => {
  console.log('Server started at port', port);
});
