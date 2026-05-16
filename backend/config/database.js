

const mongoose = require('mongoose')
require('dotenv').config()

exports.connectDB = () => {
    mongoose.connect("mongodb://localhost:27017/StudyNotion", {
        useUnifiedTopology:true,
        useNewUrlParser: true
    })
    .then(()=>{
        console.log("DB connection successfull!")
    })
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
}