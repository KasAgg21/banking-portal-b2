const express = require('express')
const { json } = require("express");
const usermodel = require('../models/Users');
const URL = require('../models/documentURL')
const Otp=require('../models/otp'); 
const { body, validationResult } = require('express-validator')

const usersmodel = usermodel();
async function addDocumentURLs(req, res){
    const urls = await URL.create({
        urls: req.body.files
    })
    console.log(req.body);
    res.status(201).json(urls);
}
async function addUserAddress(req, res){
    const newUser = await usermodel.create({
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
    res.status(201).json(newUser);
}
function docreateuser(req,resp){
    [body('email_id', "Incorrect email-id").isEmail()]
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return resp.status(400).json({errors: errors.array()});
        }
    const udoc= new usermodel(req.body);
    udoc.save().then((retDoc) => {
        resp.set(json);
        resp.json({success: true});
    })
    .catch((err) =>{
        console.log(err);
        resp.json({success: false});
    })
}

const generate4digit=async()=>{
    return Math.floor(1000+Math.random()*9000);
}
const sendOtp=async (req, res) => {
    try{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            msg:'Errors',
            errors:errors.array()

        });
    }

    const{email}=req.body;
    const userData=await User.findOne({email});
    if(!userData){
        return res.status(404).json({
            success: false,
            msg:'Email does not exist'
        }

        );
    }

    if(userData.is_verified==1){
        return res.status(400).json({
            success: false,
            msg:userData.email+'mail is already verified'
        })
    }
    const g_otp=await generate4digit();
    Otp({
        user_id:userData._id,
        otp:g_otp
    });
    const msg='<p> Hii <b>'+userData.name+'</b>,<br> <h4>'+g_otp+'</h4></p>';
    mailer.sendMail(userData.email,'Otp Verification ',msg);

    return res.status(200).json({
        success: true,
        msg:'Otp has been sent to your mail, please check!'
    });


    }
    catch(error){
        return res.status(400).json({
            success: false,
            msg:error.message
    });

}
}
module.exports = {
    addDocumentURLs,
    addUserAddress,
    docreateuser,
    sendOtp}