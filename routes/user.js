const express = require("express");
const router = express.Router();
const {getMobiles} = require('./../controllers/userMobiles');
const {protect} = require("./../middleware/auth");

router
    .get('/mobiles/',getMobiles )

module.exports = router