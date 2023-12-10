const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
var session = require('express-session');

const authRouter = require('./routes/auth');
const mobileRouter = require('./routes/mobile.js')
const userRouter = require('./routes/user.js')
const protect = require("./middleware/auth");

dotenv.config({path : "config.env"})
const app = express();

const dbConnection = require("./db.js")
dbConnection()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : '*'
}));

app.use('/api/auth', authRouter);
app.use('/api/admin', mobileRouter);
app.use('/api/user', userRouter);


// app.use('/api/apt',apartmentRouter);

app.listen(process.env.DEV_PORT, console.log(`App is running on PORT ${process.env.DEV_PORT} in ${process.env.NODE_ENV} mode`));