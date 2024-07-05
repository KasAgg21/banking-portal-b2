const mongoose = require('mongoose')

const {Schema} = mongoose;

const transactionSchema = new Schema({
    transactionId:{
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    recipientAccountNumber: {
        type: String,
        required: true
    },
    transactionAmount: {
        type: Number,
        required: true
    }
})