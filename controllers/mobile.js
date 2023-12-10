const Mobile  = require('./../models/mobile')
const Camera = require('./../models/camera')
const Battery = require('./../models/battery')
const Processor = require('./../models/processor')

exports.mobile = async function createMobile(req,res,next){
    data = req.body
    console.log(typeof(data.title))
    console.log(req.user.userId)
    try {
        // const mobile = {
        //     user_id : req.user.userId,
        //     title: data.title,
        //     brand_name: data.brand_name,
        //     price: data.price,
        //     has_5g: data.has_5g,
        //     has_nfc: data.has_nfc,
        //     has_ir_blaster: data.has_ir_blaster,
        //     ram_capacity: data.ram_capacity,
        //     internal_memory: data.internal_memory,
        //     screen_size: data.screen_size,
        //     refresh_rate: data.refresh_rate,
        //     os: data.os,
        //     extended_memory_available: data.extended_memory_available,
        //     extended_upto: data.extended_upto,
        //     rating: data.rating,
        //     resolution: data.resolution
        // }
        const mobileObj = new Mobile({
            user_id : req.user.userId,
            title: data.title,
            brand_name: data.brand_name,
            price: data.price,
            has_5g: data.has_5g,
            has_nfc: data.has_nfc,
            has_ir_blaster: data.has_ir_blaster,
            ram_capacity: data.ram_capacity,
            internal_memory: data.internal_memory,
            screen_size: data.screen_size,
            refresh_rate: data.refresh_rate,
            os: data.os,
            extended_memory_available: data.extended_memory_available,
            extended_upto: data.extended_upto,
            rating: data.rating,
            resolution: data.resolution,
        });
        const mobile = await mobileObj.save();
        // const result = await Mobile.create(mobile)
        const mobileId = mobile._id
        const camera = await createCamera(data, mobileId)
        const battery = await createBattery(data, mobileId)
        const processor = await createProcessor(data,mobileId)

        res
            .status(200)
            .json({success : true, data:{mobile, camera, battery, processor}})
        // return {...result, camera, battery, processor};
    } catch (error) {
        throw error;
    }
}

exports.getMobiles = async function getMobiles(req,res,next){
    try {
        const user_id = req.user.userId;
    
        // Step 1: Find all mobile phones associated with the user ID
        const mobiles = await Mobile.find({ user_id });
    
        // Step 2: Retrieve camera, battery, and processor records for each mobile
        const mobilesWithDetails = [];
    
        for (const mobile of mobiles) {
          const mobileId = mobile._id;
    
          const camera = await Camera.findOne({ smartphone_id: mobileId });
          const battery = await Battery.findOne({ smartphone_id: mobileId });
          const processor = await Processor.findOne({ smartphone_id: mobileId });
    
          // Combine the mobile, camera, battery, and processor details into a single object
          const mobileWithDetails = {
            mobile,
            camera,
            battery,
            processor,
          };
    
          mobilesWithDetails.push(mobileWithDetails);
        }
    
        // Now 'mobilesWithDetails' contains an array of mobile phones with their associated details
    
        res.json(mobilesWithDetails);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

async function createCamera(data, mobileId) {
    try {
        const camera = new Camera({
            smartphone_id: mobileId, // Assign the _id of the mobile
            num_rear_cameras: data.num_rear_cameras,
            num_front_cameras: data.num_front_cameras,
            primary_camera_rear: data.primary_camera_rear,
            primary_camera_front: data.primary_camera_front,
        });
        const result = await camera.save();
        return result;
    } catch (error) {
        throw error;
    }
}

async function createBattery(data, mobileId) {
    try {
        const battery = new Battery({
            smartphone_id: mobileId, // Assign the _id of the mobile
            battery_capacity: data.battery_capacity,
            fast_charging_available: data.fast_charging_available,
            fast_charging: data.fast_charging,
        });
        const result = await battery.save();
        return result;
    } catch (error) {
        throw error;
    }
}

async function createProcessor(data, mobileId) {
    try {
        const processor = new Processor({
            smartphone_id: mobileId, // Assign the _id of the mobile
            processor_brand: data.processor_brand,
            processor_speed: data.processor_speed,
            num_cores: data.num_cores,
        });
        const result = await processor.save();
        return result;
    } catch (error) {
        throw error;
    }
}




