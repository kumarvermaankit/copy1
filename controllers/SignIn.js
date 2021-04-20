
require('dotenv').config();
const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const router = express.Router();

var cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');

const saltRounds = 10;
const base64url = require('base64url');

const jwt=require('jsonwebtoken');
const secretkey=base64url.fromBase64(process.env.SECRET);
const app = express();

app.use(cookieParser());
app.use(cors());

const UserProfile=require("../models/UserProfile.models");

router.post("/",(req,res)=>{

    UserProfile.findOne({
        email:req.body.email
    })
    .then(user=>{
        if(user){
           if (bcrypt.compareSync(req.body.password,user.password)){
               
            const payLoad={
            _id:user._id,
            email:user.email,
            username:user.username,
            questions:user.questions,
            
            }
            var token= jwt.sign({data:payLoad},secretkey,{
                expiresIn:1440
            });
           res.send(token);
           }
           else if(!(bcrypt.compareSync(req.body.password,user.password))){
               res.status(404)
               res.send({data:false})
               res.json({success:false ,message:"Failed"})
           }
           else{
              
               res.status(404)
               res.send({data:false})
            res.json({success:false ,message:"Failed"})
           }
        }
        else{
            res.status(404)
               res.send({data:false})
            res.json({success:false ,message:"Failed"})
        }
    }).catch(err=>{console.log(err)});
})








router.get("/info",verifyToken,(req,res)=>{


    jwt.verify(req.token,secretkey,(err,authData)=>{
        if(err){
            res.sendStatus(403);
        }
        else{
            
            UserProfile.findOne({_id: authData._id})
            .then(user=>{
                console.log(user);
                if(user){
                    res.send(user)
                } else {
                    res.send("User does not exist")
                }
        })
   
        }


    })
    
        
  


      
    

})
    
function verifyToken(req,res,next){

    const bearerHeader =req.headers['authorization'];
if( bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split(" ");
    const bearerToken=bearer[1];
    req.token= bearerToken;
    next();
return(req.token)

}
else{
    res.sendStatus(403);
}
}


router.get("/availableinfo",(req,res,next)=>{
 
    
    var email=[]

    try{
        UserProfile.find()
        .then((result)=>{
            result.map((each)=>{
   
    email.push(each.email)
            })
            res.send({data:email})
        })
        .catch((err)=>{
            res.send(err)
        })
    }
 
    catch(err){
        res.send(err)
    }
})

   
module.exports=router;