const mongoose = require("mongoose");

const MONGO_URL = require('./config')

const ConnectDB = async () => {
    await mongoose.connect(MONGO_URL);
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

const AccountSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
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