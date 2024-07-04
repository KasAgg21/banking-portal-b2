const express = require('express');
const { addUserAddress, docreateuser, sendOtp } = require('../Controller/user_controller');
const { otpMailValidator, userValidation, addressValidation } = require('../helpers/validation');

const router = express.Router();

router.post("/create-user", userValidation, docreateuser);
router.post("/user-address", addressValidation, addUserAddress);
router.post('/send-otp', otpMailValidator, sendOtp);

module.exports = router;
