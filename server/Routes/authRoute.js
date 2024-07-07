const express = require('express')
const router = express.Router();

router.use(express.json());

const userController=require('../Controller/user_controller');


module.exports = router;
