const express = require('express')
const router = express.Router();
const users = require('../models/Users');

router.post("/createUser", async (req, res) => {
    try{
        await users.create({
            name: "Rajesh koothrapali",
            age: 25,
            address: {
                locality: 'cenral perk',
                house_no: 124,
                street: '15-A',
                city: 'Massachusetts',
                postcode: '01094',
            },
            email_id: "rajkooth123@hotmail.com"
        })
        res.json({success: true});
    }
    catch(err){
        console.log(err);
        res.json({success: false});
    }
});

module.exports = router;