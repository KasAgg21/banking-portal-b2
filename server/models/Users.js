// user_model.js
const mongoose = require('mongoose');

const NameSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: false },
    lastName: { type: String, required: true }
});

const AddressSchema = new mongoose.Schema({
    locality: { type: String, required: true },
    sub_area: { type: String, required: false },
    house_no: { type: Number, required: true },
    street: { type: String, required: true },
    sec_street: { type: String, required: false },
    city: { type: String, required: true },
    postcode: { type: String, required: true }
});

const UserSchema = new mongoose.Schema({
    name: { type: NameSchema, required: true },
    age: { type: Number, required: true },
    address: { type: AddressSchema, required: true },
    email_id: { type: String, required: true },
    is_verified:{type:Number,default:0}
});

module.exports = mongoose.model('users', UserSchema);
