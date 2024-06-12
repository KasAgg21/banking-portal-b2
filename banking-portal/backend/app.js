const express = require('express')
const mongoDB = require('./db')
const app = express()
const port = 5000
mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})