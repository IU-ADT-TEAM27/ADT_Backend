const mongoose = require('mongoose');
const fs = require('fs');
const csv = require('csv-parser');
const mobiles = require('./models/mobile');

const file_path = './data/smartphone_cleaned_v5.csv';

module.exports =  async function connect(){
    try{
        const conn = await mongoose.connect('mongodb+srv://lavakoyi:lavakumar@cluster0.zkdtexu.mongodb.net/ADT_Team27')
        console.log("MongoDB connected successfully");
    }catch(err){
        console.log("Error : ", err)
    }   
}