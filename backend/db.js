const mongoose = require("mongoose");

const ConnectDB = async () => {
    await mongoose.connect('mongourl');
    console.log("Connected to MongoDB!!");
}

var UserSchema = new mongoose.Schema({
    username : { 
        type : String , 
        required : true
    } ,
    password : {
        type : String,
        required : true 
    } ,
    email : { 
        type : String , 
        required : true 
    },
    firstname : { 
        type : String , 
        required : true 
    } ,
    lastname : { 
        type : String , 
        required : true 
    } ,
} , {timestamps : true} );

const User = mongoose.model('Users' , UserSchema);

module.exports = {
    User
}