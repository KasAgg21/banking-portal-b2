const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    urls: {
        type: [String],
        required: true,
    }
});

module.exports = mongoose.model('URLPair', urlSchema);
