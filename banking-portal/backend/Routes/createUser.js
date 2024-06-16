const express = require('express')
const router = express.Router();
const users = require('../models/Users');
const { body, validationResult } = require('express-validator')

router.post(
    "/createUser",
    [body('email_id', "Incorrect email-id").isEmail()],
    async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        try{
            await users.create({
                name: req.body.name,
                age: req.body.age,
                address: {
                    locality: req.body.address.locality,
                    sub_area: req.body.address.sub_area,
                    house_no: req.body.address.house_no,
                    street: req.body.address.street,
                    sec_street: req.body.address.sec_street,
                    city: req.body.address.city,
                    postcode: req.body.address.postcode
                },
                email_id: req.body.email_id
            });
            res.json({success: true});
        }
        catch(err){
            console.log(err);
            res.json({success: false});
        }

    });

module.exports = router;