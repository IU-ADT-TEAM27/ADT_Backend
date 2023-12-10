const mongoose = require('mongoose');
const processorSchema = mongoose.Schema({
    smartphone_id : {
        type : mongoose.Schema.Types.ObjectId
    },
    processor_brand :{
        type : String
    },
    processor_speed:{
        type : String
    },
    num_cores :{
        type : Number
    }
}, {'collection': 'processor'})

module.exports = mongoose.model('processor', processorSchema);