const mongoose = require('mongoose')

const {Schema} = mongoose;

const transactionSchema = new Schema({
    senderEmail: {
        type: String,
        required: true
    },
    recieverEmail: {
        type: String,
        required: true
    },
    receiverName: {
        type: String,
        required: true
    },
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
    },
    status: {
        type: String,
        required: true
    }
})