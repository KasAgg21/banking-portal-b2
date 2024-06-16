const express = require('express')
const { json } = require("express");
const usermodel = require('../models/Users');
const { body, validationResult } = require('express-validator')

const usersmodel = usermodel();

function docreateuser(req,resp){
    [body('email_id', "Incorrect email-id").isEmail()]
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
    const udoc= new usersmodel(req.body);
    udoc.save().then((retDoc) => {
        resp.set(json);
        res.json({success: true});
    })
    .catch((err) =>{
        console.log(err);
        res.json({success: false});
    })
}

module.exports = {docreateuser};