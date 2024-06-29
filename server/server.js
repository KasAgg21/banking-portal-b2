const express = require('express')
const mongoDB = require('./db')
const cros = require("cors");
const dotenv = require("dotenv")

const app = express()
const port = 5000

const userbase = require("./Routes/userdata");

mongoDB();

app.use(cros());
app.use(express.json())

app.use('/userbase', userbase);

app.listen(port, function () {
  console.log("Server Started at ",port)
})