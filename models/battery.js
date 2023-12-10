const mongoose = require('mongoose');
const batterySchema = mongoose.Schema({
    smartphone_id : {
        type : mongoose.Schema.Types.ObjectId
    },
    battery_capacity:{
        type : String
    },
    fast_charging_available: {
        type: Boolean
    },
    fast_charging: {
        type: String
    }
}, {collection: 'battery'})

module.exports = mongoose.model('battery', batterySchema);