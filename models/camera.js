const mongoose = require('mongoose');
const cameraSchema = mongoose.Schema({
    smartphone_id : {
        type : mongoose.Schema.Types.ObjectId
    },
    num_rear_cameras:{
        type: Number
    },
    num_front_cameras:{
        type : Number
    },
    primary_camera_rear:{
        type : String
    },
    primary_camera_front:{
        type : String
    }
})

module.exports = mongoose.model('camera', cameraSchema);