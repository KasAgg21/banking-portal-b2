const mongoose = require('mongoose');
const mongoURL = 'mongodb+srv://akshavya2509:Ly2mUsR9zBlChy2y@cluster0.olzvwz6.mongodb.net/';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = mongoDB;
