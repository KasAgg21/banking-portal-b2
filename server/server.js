const express = require('express');
const mongoDB = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000; 

const userbase = require('./Routes/userdata');

mongoDB();

app.use(cors());
app.use(express.json());

app.use('/userbase', userbase);

app.listen(port, function () {
  console.log("Server Started at ", port);
});
