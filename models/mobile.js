const mongoose = require('mongoose');
const phoneSchema = mongoose.Schema({
    user_id : {
        type: String,
        required : true
    },
    title:{
        type : String,
        required : true
    },
    brand_name : {
        type: String,
        required : true
    },
    price:{
        type : String,
        isrequired : true
    },
    has_5g:{
        type: Boolean,
    },
    has_nfc:{
        type: Boolean
        
    },
    has_ir_blaster:{
        type: Boolean
        
    },
    ram_capacity:{
        type : Number
    },
    internal_memory :{
        type : Number
    },
    screen_size:{
        type : Number
    },
    refresh_rate: {
        type : Number
    },
    os : {
        type : String
    },
    extended_memory_available:{
        type : Boolean
    },
    extended_upto: {
        type : Number
    },
    rating : {
        type : Number
    },
    resolution : {
        type : String
    }
}, {'collection': 'phone'})

module.exports = mongoose.model('phone', phoneSchema);