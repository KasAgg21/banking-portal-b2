const express = require('express')
const { json } = require("express");
const usermodel = require('../models/Users');
const Otp=require('../models/otp'); 
const { body, validationResult } = require('express-validator')

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

const fetchUserDetails = async (req, res) => {
    const { email } = req.query;
    try {
        const userdata = await usermodel.findOne({ email_id: email });
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
            name: `${usermodel.name.firstName} ${usermodel.name.lastName}`,
            balance: 10500.00,
            transactions,
            favouriteTransfers
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
    const userData=await usermodel.findOne({email});
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
    addUserAddress,
    docreateuser,
    sendOtp,
    fetchUserDetails
}