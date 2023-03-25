const express = require('express')
const app = express()
const { connection } = require('./db')
const { authroute } = require('./middlewares/auth.middleware')
app.use(express.json())
const { approuter } = require('./routes/app.routes')
const { signrouter } = require('./routes/signin.routes')
const cors = require("cors");
app.use(cors());
require("dotenv").config()




app.use("/",signrouter)
app.use("/",authroute)
app.use("/todos",approuter)


app.listen(process.env.port,async ()=>{

    try {
        await connection
        console.log("mongo is connected")
        console.log("app is running on port 4500")
    } catch (error) {
    console.log(error.message)
    }



})




