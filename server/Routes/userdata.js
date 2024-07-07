const express = require('express');
const { addUserAddress, docreateuser, sendOtp,fetchUserDetails } = require('../Controller/user_controller');
const { otpMailValidator, userValidation, addressValidation } = require('../helpers/validation');

const router = express.Router();

router.post("/create-user", userValidation, docreateuser);
router.post("/user-address", addressValidation, addUserAddress);
router.post('/send-otp', otpMailValidator, sendOtp);
router.get('/details', fetchUserDetails);

module.exports = router;
