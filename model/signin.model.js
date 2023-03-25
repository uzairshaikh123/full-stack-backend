const mongoose=require('mongoose')


const authSchema=mongoose.Schema({
   email:String,
   password:String,
   username:String
})

const authModel=mongoose.model("authdata",authSchema)


module.exports={
    authModel
}