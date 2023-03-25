const mongoose=require('mongoose')


const appSchema=mongoose.Schema({
    title:String,
    completed:Boolean,
    userID:String
})

const appModel=mongoose.model("tododata",appSchema)


module.exports={
    appModel
}





