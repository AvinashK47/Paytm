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
    password : zod.string()
});

router.post('/signup', async (req,res)=>{

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


    await Account.create({
        userId,
        balance : 1 + Math.random()*10000
    })

    const token = jwt.sign( { userId } , JWT_SECRET , { expiresIn:'1h' } )

    return res.status(200).json({
        message : "User created Successfully",
        token : token
    })
    
});

const SignInSchema = zod.object({
    username : zod.string,
    password : zod.string
});


router.get('/signin', async(req,res)=>{

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

router.put('/update', authMiddleware , async (req,res,next)=>{

    const{success} = UpdateBody.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message : "Error while updating Information"
        })
    }

    await User.updateOne( { _id : req.userId } , req.body );

    res.json({
        message : "Updated Successfully"
    })

});

router.get('/bulk',authMiddleware,async(req,res,next)=>{
    const filter = req.query.filter || "" ;
    User.find({
        $or : [{
            firstname : {
                "$regex" : filter
            }
        },{
            lastname : {
                "$regex" : filter 
            }
        }]
    })

    res.json({
        user : users.map(user=>({
            username : user.username,
            firstname : user.firstname,
            lastname : user.lastname,
            _id : user._id
        }))
    })
});


module.exports = router