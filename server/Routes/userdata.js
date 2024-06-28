const express = require('express')

const {docreateuser} = require('../Controller/user_controller');
const{otpMailValidator} = require('../helpers/validation'); 

const router = express.Router();

router.post("/create-user", docreateuser);
 
//otp verification routes
router.post('/send-otp',otpMailValidator,docreateuser.sendOtp);


module.exports = router;
