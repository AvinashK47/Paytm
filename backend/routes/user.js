const zod = require('zod');
const {User}= require('../db')
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config.js') ;
const authMiddleware = require('../middlewares/middleware');
const router = express.Router();

const SignupSchema = zod.object({
    username : zod.string(),
    firstname : zod.string(),
    lastname : zod.string(),
    phno : zod.number(),
    password : zod.string()
});

router.post('/signup', async (req,res)=>{

    res.send("signup page")

    const result = SignupSchema.safeParse(req.body);
    if(!result.success){
        return (
            res.status(411).json({messsage : "Email already taken/incorrect inputs" })
        )
    }
    
    const tempUser = await User.findOne({
    username : req.body.username
    })

    if (tempUser){
        return(
            res.status(411).json({ message: "Email already taken / incorrect inputs "})
        )
    }

    const user = await User.create({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:req.body.password
    })

    const userId = User._id;

    const token = jwt.sign( { userId } , JWT_SECRET , { expiresIn:'1h' } )

    res.status(200).json({
        message : "User created Successfully",
        token : token
    })
    
});

const SignInSchema = zod.object({
    username : zod.string,
    password : zod.string
});


router.get('/signin', async(req,res)=>{

    res.send("signin page")
    const result = SignInSchema.safeParse(req.body);
    
    if(result != {success}){

        return(
            res.status(411).json({
                message : " Invalid Credentials. "
            })
        );
    };

    const user = User.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(user){
        
        const userId = User._id;
        const token = jwt.sign( userId , JWT_SECRET , { expiresIn : '1h' })
        return(
            res.json({
                token : token
            })
        );
    };

    return(
        res.json({
            message : " Error while logging in."
        })
    );
});

const UpdateBody = zod.object({
    password : zod.string().optional(),
    firstname : zod.string().optional(),
    lastname : zod.string().optional()
})

router.put('/update',authMiddleware,(req,res,next)=>{
    res.send("updation page");
})

module.exports = router;