const mongoose = require("mongoose");

const connectDb = async ()=>{
    try {
        const connection = await mongoose.connect("mongodb+srv://pankajgiri6585:8TH69HlW44QF2TTv@cluster0.f0icw.mongodb.net/Ecommerce");
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDb;