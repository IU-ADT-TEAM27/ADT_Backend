const Mobile  = require('./../models/mobile')
const Camera = require('./../models/camera')
const Battery = require('./../models/battery')
const Processor = require('./../models/processor')


exports.getMobiles = async function getMobiles(req,res,next){
    try {
        // const user_id = req.user.userId;
    
        // Step 1: Find all mobile phones associated with the user ID
        const mobiles = await Mobile.find().limit(50);
    
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