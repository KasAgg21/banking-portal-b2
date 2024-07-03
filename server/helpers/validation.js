const { check } = require('express-validator');

exports.otpMailValidator=[
    check('email','Please include a valid email').isEmail().normalizeEmail({
        gmail_removedots:true
    }),
];

exports.userValidation=[
    check('email_id', "Incorrect email-id").isEmail(),
    check('name.firstName', "First name is required").notEmpty(),
    check('name.lastName', "First name is required").notEmpty(),
    check('age', "Age must be a number").isNumeric(),
    check('address.locality', "Locality is required").notEmpty(),
    check('address.house_no', "House number must be a number").isNumeric(),
    check('address.street', "Street is required").notEmpty(),
    check('address.city', "City is required").notEmpty(),
    check('address.postcode', "Postcode is required").notEmpty(),
];

exports.addressValidation = [
    check('address.locality', "Locality is required").notEmpty(),
    check('address.house_no', "House number must be a number").isNumeric(),
    check('address.street', "Street is required").notEmpty(),
    check('address.city', "City is required").notEmpty(),
    check('address.postcode', "Postcode is required").notEmpty(),
];