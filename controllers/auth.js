const User = require('./../models/user');
const uuid = require('uuid');

// Register User
// @route /api/auth/register
exports.register = async (req,res,next) => {
    const {firstName, lastName, email, password, phoneNumber } = req.body
    const existing_user = await User.findOne({email})
    if(existing_user){
        return res.status(400).json({success : false, data : "user with email id already exists"})
    }
    const userId = uuid.v4();
    const user = await User.create({
        userId,
        firstName,
        lastName,
        email,
        password,
        phoneNumber
    })
    // res.status(200).json({success : true})
    sendTokenResponse(user,res);
}

exports.login = async (req,res,next) => {
    const {email, password} = req.body;

    console.log(req.body)

    if(!email || !password){
        return res.status(400).json({success : false, data : "Please enter a valid username and password"})
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(401).json({success : false, data : "Invalid Credentials"})
    }

    const isMatch = await user.comparePassword(password)

    if(!isMatch){
        return res.status(401).json({success : false, data : "Invalid Credentials"})
    }

    // const jwtToken = await user.getSignedJwtToken()

    // return res.status(400).json({success : true, data : {token : jwtToken}})

    sendTokenResponse(user,res);
}

const sendTokenResponse = async (user,res) => {
    const token = await user.getSignedJwtToken();

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
        httpOnly : true
    }

    res
    .status(200)
    .cookie('token',token, cookieOptions)
    .json({success : true, token : token})
}

// Reset Password
// @route /api/auth/reset_password

// Login User
// @route /api/auth/login