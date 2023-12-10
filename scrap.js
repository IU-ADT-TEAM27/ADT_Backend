await mobiles.deleteMany({})

        fs.createReadStream(file_path).pipe(csv())
        .on('data',async (row) => {
            const phone = new mobiles({
                title: row.model,
                brand_name : row.brand_name,
                price : row.price,
                has_5g: row.has_5g === 'TRUE',
                has_nfc : row.has_nfc === 'TRUE',
                has_ir_blaster: row.has_ir_blaster  === 'TRUE',
                processor_speed: row.processor_speed,
                battery_capacity : row.battery_capacity,
                fast_charging_available: row.fast_charging_available === 'TRUE',
                fast_charging: row.fast_charging,
                ram_capacity:row.ram_capacity,
                internal_memory: row.internal_memory,
                screen_size: row.screen_size,
                refresh_rate: row.refresh_rate,
                num_rear_cameras :  row.num_rear_cameras,
                num_front_cameras : row.num_front_cameras,
                os : row.os,
                primary_camera_rear : row.primary_camera_rear,
                primary_camera_front : row.primary_camera_front,
                extended_memory_available : row.extended_memory_available,
                extended_upto : row.extended_upto,
                rating : row.rating,
                resolution : row.resolution,
                num_cores : row.num_cores,
                processor_brand: row.processor_brand
            })

            await phone.save()
        }).on('end', async () => {
            try{
                console.log("CSV file processing is completed")
            }
            catch(error){
                console.error("Error", error)
            }
        }).on('error',(error) => {
            console.log("error", error)
        })