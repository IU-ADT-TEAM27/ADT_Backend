const jwt = require('jsonwebtoken');
const User = require('./../models/user');

exports.protect = async function(req,res,next){
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        token = req.headers.authorization.split(' ')[1]
    }else if(req.cookies.token){
        token = req.cookies
    }

    if(!token){
        res.status(401).json({success : false, data : "Invalid token"})
    }

    try{
        const decoded_JWT = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findOne({userId : decoded_JWT.id});
        next()
    }catch(err){
        res.status(401).json({success : false, data : "Invalid token"})
    }
}