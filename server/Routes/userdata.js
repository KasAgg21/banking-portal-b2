const express = require('express')

const {docreateuser} = require("../Controller/user_controller")

const router = express.Router();

router.post("/create-user", docreateuser);

module.exports = router;
