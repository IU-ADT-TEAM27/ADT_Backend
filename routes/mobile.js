const express = require("express");
const router = express.Router()
const {mobile,getMobiles} = require('./../controllers/mobile');
const {protect} = require("./../middleware/auth");

router
    .post('/mobile',protect,mobile)
    .get('/mobiles/',protect,getMobiles )

module.exports = router