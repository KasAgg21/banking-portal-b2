const express = require('express')
require('dotenv').config();

const {docreateuser,sendOtp,verifyOtp,sendOtpMobile,verifyOtpMobile,addDocumentURLs,fetchUserDetails} = require('../Controller/user_controller');
const addUserAddress=require('../Controller/user_address');
const{otpMailValidator,verifyOtpValidator,userValidation, addressValidation,docsValidation} = require('../helpers/validation'); 

const router = express.Router();
router.use(express.json());

const path=require('path');
const multer=require('multer');

router.post("/create-user", docreateuser); 
 
//otp verification routes
router.post('/send-otp',otpMailValidator,sendOtp);
router.post('/verify-otp',verifyOtpValidator,verifyOtp);
router.post('/send-otp-mobile',otpMailValidator,sendOtpMobile);
router.post('/verify-otp-mobile',verifyOtpValidator,verifyOtpMobile);

router.post("/add-docs", docsValidation, addDocumentURLs);
router.post("/user-address", addressValidation, addUserAddress);
router.get('/details', fetchUserDetails);

module.exports = router;