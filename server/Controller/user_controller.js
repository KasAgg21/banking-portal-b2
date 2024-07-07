const express = require('express');
const router = express.Router();
const { json } = require("express");
const User = require('../models/Users');
const URL = require('../models/documentURL');
const Otp = require('../models/otp');
const { validationResult, body } = require('express-validator');
const mailer = require('../helpers/mailer');
const { oneMinuteExpiry, threeMinuteExpiry } = require('../helpers/otpValidate');
const OtpModel = require('../models/otpMobile');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const twilioClient = new twilio(accountSid, authToken);

const docreateuser = async (req, res) => {
    try {
        const { name, age, address, email_id } = req.body;
        const isExists = await User.findOne({ email_id });
        if (isExists) {
            return res.status(400).json({
                success: false,
                msg: 'Email already exists'
            });
        }
        const newUser = new User({
            name,
            age,
            address: {
                locality: address.locality,
                sub_area: address.sub_area,
                house_no: address.house_no,
                street: address.street,
                sec_street: address.sec_street,
                city: address.city,
                postcode: address.postcode
            },
            email_id
        });

        const userData = await newUser.save();
        return res.status(200).json({
            success: true,
            msg: 'Registered successfully',
            user: userData
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const addDocumentURLs = async (req, res) => {
    const urls = await URL.create({
        urls: req.body.files
    });
    console.log(req.body);
    res.status(201).json(urls);
};

const fetchUserDetails = async (req, res) => {
    const { email } = req.query;
    try {
        const userdata = await User.findOne({ email_id: email });
        if (!userdata) return res.status(404).json({ error: "User not found" });

        // Simulated transactions and favourite transfers
        const transactions = [
            { name: "Jenny Wilson", id: "2425666", status: "Money In", amount: "+$455.00", date: "20 Dec 22" },
            { name: "Robert Fox", id: "2425666", status: "Money Out", amount: "-$455.00", date: "20 Dec 22" },
            { name: "Jacob Jones", id: "2425666", status: "Money In", amount: "+$455.00", date: "20 Dec 22" }
        ];

        const favouriteTransfers = [
            { name: "Kathryn Murphy" },
            { name: "Wade Warren" }
        ];

        res.json({
            name: `${userdata.name.firstName} ${userdata.name.lastName}`,
            balance: 10500.00,
            transactions,
            favouriteTransfers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const generate4digit = async () => {
    return Math.floor(1000 + Math.random() * 9000);
};

const sendOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { email_id } = req.body;
        const userData = await User.findOne({ email_id });
        if (!userData) {
            return res.status(404).json({
                success: false,
                msg: 'Email does not exist'
            });
        }

        if (userData.is_verified == 1) {
            return res.status(400).json({
                success: false,
                msg: `${userData.email_id} mail is already verified`
            });
        }
        const g_otp = await generate4digit();

        const oldOtpData = await Otp.findOne({ user_id: userData._id });
        if (oldOtpData) {
            const sendNextOtp = await oneMinuteExpiry(oldOtpData.timestamp);
            if (!sendNextOtp) {
                return res.status(400).json({
                    success: false,
                    msg: 'Please try after some time'
                });
            }
        }

        const cDate = new Date();
        await Otp.findOneAndUpdate(
            { user_id: userData._id },
            { otp: g_otp, timestamp: new Date(cDate.getTime()) },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        const msg = `<p>Hi <b>${userData.name}</b>,<br> Here is the verification code <b>${g_otp} </b> to verify your account. Kindly use it to verify your account.</p>`;
        mailer.sendMail(userData.email_id, 'Verification Code', msg);

        return res.status(200).json({
            success: true,
            msg: 'Otp has been sent to your mail, please check!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const verifyOtp = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                msg: 'Errors',
                errors: errors.array()
            });
        }

        const { user_id, otp } = req.body;
        const otpData = await Otp.findOne({
            user_id,
            otp
        });
        if (!otpData) {
            return res.status(400).json({
                success: false,
                msg: 'You entered wrong OTP'
            });
        }

        const isOtpExpired = await threeMinuteExpiry(otpData.timestamp);
        if (isOtpExpired) {
            return res.status(400).json({
                success: false,
                msg: 'Your OTP has expired'
            });
        }
        await User.findByIdAndUpdate({ _id: user_id }, {
            $set: {
                is_verified: 1
            }
        });
        return res.status(200).json({
            success: true,
            msg: 'Account verified successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const sendOtpMobile = async (req, res) => {
    try {
        const { phoneNumber } = req.body;
        const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, specialChars: false });
        const cDate = new Date();
        await OtpModel.findOneAndUpdate(
            { phoneNumber },
            { otp, otpExpiration: new Date(cDate.getTime()) },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        await twilioClient.messages.create({
            body: `Your OTP for verification is: ${otp}`,
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        return res.status(200).json({
            success: true,
            msg: 'Otp sent successfully!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};

const verifyOtpMobile = async (req, res) => {
    try {
        const { phoneNumber, otp } = req.body;
        const otpData = await OtpModel.findOne({
            phoneNumber,
            otp
        });

        if (!otpData) {
            return res.status(400).json({
                success: false,
                msg: 'You entered wrong otp'
            });
        }
        const isOtpExpired = await threeMinuteExpiry(otpData.otpExpiration);
        if (isOtpExpired) {
            return res.status(400).json({
                success: false,
                msg: 'Your OTP has expired'
            });
        }

        return res.status(200).json({
            success: true,
            msg: 'OTP verified successfully'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }
};
module.exports = {
    addDocumentURLs,
    docreateuser,
    sendOtp,
    verifyOtp,
    sendOtpMobile,
    verifyOtpMobile,
    fetchUserDetails
};
    

