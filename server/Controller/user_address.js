const express = require('express')
const { json } = require("express");
const usermodel = require('../models/Users');
const Otp=require('../models/otp'); 
const { body, validationResult } = require('express-validator')

async function addUserAddress(req, res){
    await usermodel.create({
        name: {
            firstName: "Raman",
            middleName: "",
            lastName: "Raghav"
        },
        age: 23,
        address: {
            locality: req.body.locality,
            sub_area: req.body.sub_area,
            house_no: req.body.house_no,
            street: req.body.street,
            sec_street: req.body.sec_street,
            city: req.body.city,
            postcode: req.body.postcode
        },
        email_id: "ramanraghav2.0@gmail.com"
    })
}

module.exports = addUserAddress;