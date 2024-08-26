require ('dotenv').config()

const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startswith("Bearer ") ){
        return res.status(403).json({})
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token,jwtSecret);
        req.userId = decoded.userId;

        next();
    }
    catch(err){
        return(
            res.status(403).json({})
        );
    };
};

module.exports = authMiddleware ;