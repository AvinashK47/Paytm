require('dotenv').config()

const mongouri = process.env.MONGO_URI

const mongoose = require("mongoose");

if (mongoose.connect(mongouri)){
    console.log("Connected to MongoDB Successfully")
}

var UserSchema = new mongoose.Schema({
    username : { 
        type : String ,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30, 
        required : true
    } ,
    password : {
        type : String,
        required : true,
        minLength : 6 
    } ,
    firstname : { 
        type : String , 
        required : true 
    } ,
    lastname : { 
        type : String , 
        required : true 
    } ,
} , {timestamps : true} );

const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'         ,
        required : true
    },
    balance : {
        type : Number,
        required : true
    }
}) 

const Account = mongoose.model('Account' , AccountSchema)
const User = mongoose.model('Users' , UserSchema);

module.exports = {
    User,
    Account
}