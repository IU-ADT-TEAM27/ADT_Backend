const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    userId : {
        type : String,
        required : true,
        unique : true
    },
    firstName : {
        type : String,
        required : false,
        maxlength : 50
    },
    lastName : {
        type : String,
        required : false,
        maxlength : 50
    },
    email:{
        type : String,
        required : true,
        match : [
            /^([0-9a-zA-Z]([-\.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/,
            'Please enter a valid email address'
        ]
    },
    password:{
        type : String,
        required : true,
        select : false,
        minlength : 8
    },
    phoneNumber : {
        type : Number,
        required : true,
        length : 10
    },
    createdAt : {
        type : Date,
        default : Date.now
    },
    resetPasswordToken:{
        type : String
    },
    tokenExpiry : {
        type : Date
    },
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'
    },
    profile_pic:{
        type : String
    }
})

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

userSchema.methods.getSignedJwtToken = async function(){
    return await jwt.sign({id : this.userId}, process.env.JWT_SECRET, {
        expiresIn : process.env.JWT_EXPIRE
    });
    
};

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', userSchema);