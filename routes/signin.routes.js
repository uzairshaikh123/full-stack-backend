const express = require('express')
const { authModel } = require('../model/signin.model')
const signrouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

signrouter.post("/register", async (req, res) => {
    let {email,password,username} = req.body
    try {
        let regdata = await authModel.find({email,password,username})
        
        if (regdata.length) {
            res.send({ "msg": "User already registered" })
        } else {

            bcrypt.hash(password, 5,async function(err, hash) {
                const data = new authModel({email,password:hash,username})
                await data.save()
                // Store hash in your password DB.
                res.send({ "msg": "User registered successfully" })
            });
        }
    } catch (error) {
        console.log(error)
        res.send({ "msg": error.message })
    }
})



signrouter.post("/login", async (req, res) => {

    let { email, password } = req.body


    try {
        const data = await authModel.find({email})
        
          const hash=data[0].password
          console.log(data[0]._id,hash)
        // console.log()
        if (data.length) {
            bcrypt.compare(password, hash, function(err, result) {
                // console.log("ers",result)
               if(result){
                   res.status(200).send({ "msg": "User loggedin  successfully", token: jwt.sign({"userID":data[0]._id}, 'username') })
                   
                }else{
                   res.status(400).send({ "msg": "Password is incorrect"})

               }
            });
        } else {
            res.send({ "msg": "Login failed" })

        }
    } catch (error) {
        console.log(error)
        res.send({ "msg": error.message })

    }




})

module.exports = {
    signrouter
}