const express=require('express')
const { appModel } = require('../model/app.model')
const approuter = express.Router()
const jwt = require('jsonwebtoken')


approuter.get("/",async (req,res)=>{
  let token = req.headers.authorization
  let decoded = jwt.verify(token,"username")
  try {
    if(decoded){
      let data =await appModel.find({"userID":decoded.userID})
      
      console.log(data)
      res.status(200).send(data)
    }
   
   } catch (error) {
    res.status(400).send({"error":error.message})
   }


})
approuter.post("/",async (req,res)=>{

    let payload=req.body
    // console.log(req.body)
    try {
        let data =new appModel(payload)
        await data.save()
        res.status(200).send({"msg":"data has been posted"})
       } catch (error) {
        res.status(400).send({"error":error.message})
       }


})
approuter.patch("/:id",async (req,res)=>{
let {id}=req.params
let payload=req.body
    try {
      await appModel.findByIdAndUpdate({_id:id},payload)
        res.status(200).send({"msg":"data has been updated"})
       } catch (error) {
        res.status(400).send({"error":error.message})
       }


})
approuter.put("/:id",async (req,res)=>{
    let {id}=req.params
    let payload=req.body
    try {
      await appModel.findOneAndReplace({_id:id},payload)
        res.status(200).send({"msg":"data has been replaced"})
       } catch (error) {
        res.status(400).send({"error":error.message})
       }

})
approuter.delete("/:id",async (req,res)=>{
    let {id}=req.params
    try {
        let data =await appModel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"data has been deleted"})
       } catch (error) {
        res.status(400).send({"error":error.message})
       }


})

module.exports={
    approuter
}