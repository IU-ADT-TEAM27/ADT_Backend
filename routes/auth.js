const express = require("express");
const router = express.Router()
const {register,login} = require("./../controllers/auth");
// const { passportAuthentication, googleCallbackUrls } = require("./../controller/passport.js");
const passport = require('passport');
const {protect} = require("./../middleware/auth.js")

router
    .post('/register',register)
    .post('/login', login)

// router.get('/google', passport.authenticate('google', { scope: [ 'email', 'profile' ] }))
// router.get('/google/callback', passport.authenticate('google', { successRedirect: '/auth/google/success', failureRedirect: '/auth/google/failure' }))

// router.get('/google',passportAuthentication())
// router.get('/google/callback',googleCallbackUrls())

module.exports = router