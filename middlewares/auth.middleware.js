const express=require('express')
const authroute = express.Router()
const jwt = require('jsonwebtoken');

authroute.use((req,res,next)=>{
let token = req.headers.authorization
// console.log(req.headers.authorization)
if(token){
 jwt.verify(token, 'username', function(err, decoded) {
   //  console.log(req.method,token)
    if(decoded){
      req.body.userID=decoded.userID
    next()
 }else{
    res.send({"error":err.message})
 }
});
}else {
   res.status(400).send({"msg":"Please Login First!"})
}
})

module.exports={
    authroute
}
