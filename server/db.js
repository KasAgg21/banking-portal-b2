const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const mongoURL = process.env.DATABASE_URL;

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Database Connected Successfully");
        const fetched_data = await mongoose.connection.db.collection("users")
        fetched_data.find({}).toArray(function(err, data){
            if(err) console.log(err);
            else console.log(data)
        })
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = mongoDB;
