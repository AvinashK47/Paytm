const express = require('express')
const { authMiddleware } = require('../middlewares/middleware');
const { Account } = require('../db');

const router = express.Router();

router.get('/balance',authMiddleware,async(req,res,next)=>{

    const account = await Account.findOne({
        userId : req.userId
    });
    console.log(account)

    res.json({
        "balance" : account.balance
    })
})

router.post('/transfer' , authMiddleware , async(req,res,next)=>{
    const { to , amount } = req.body;

    const account = await Account.findOne({
        userId : req.userId
    })

    if (account.balance < amount){
        return res.status(400).json({
            message : "Insufficient Balance"
        })
    }
    
    const toAccount = await Account.findOne({
        userId : to
    })

    if (!toAccount){
        return res.status(400).json({
            message : "Accountount not found"
        })
    }

    await Account.updateOne({
        userId : req.userId
    },{
        $inc : { balance : -amount }
    })

    await Account.updateOne({
        userId : to
    },{
        $inc : { balance : amount}
    })

    res.json({
        message : "Transfer Successful"
    })
})

module.exports = router 