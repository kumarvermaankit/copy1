
require('dotenv').config();
const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

const router = express.Router();

const app = express();
const multer=require("multer");
var cookieParser = require('cookie-parser')
const jwt=require('jsonwebtoken');
app.use(cookieParser());
app.use(cors());



const bcrypt = require('bcrypt');

const saltRounds = 10;

const UserProfile=require("../models/UserProfile.models");

const secret=process.env.MYSECRET;





router.post("/",(req,res)=>{

const today=new Date();

const newUser= {
 email:req.body.email,
 username:req.body.username,
password:req.body.password,
questions:[],
languages:[],
frameworks:[],
field:[],




}

try{

UserProfile.findOne({email:req.body.email})
.then(user=>{
    if(!user){
        bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
       
        newUser.password=hash;
        UserProfile.create(newUser)
       
        
        .then(user=>{
res.json({status:user.username + "  is registered Successfully",data:true})

        })     
.catch(err=>res.json("ERROR" + err));
        })
    }
    else {
       res.json({status:"User Already Exists",data:false});
        }
})
.catch(err=>res.json({status:"User does not Exist"}));
}
catch(err){
    console.log(err)
}

})

router.get("/availableinfo",(req,res,next)=>{
 
    var username=[]
    var email=[]

    try{
        UserProfile.find()
        .then((result)=>{
            result.map((each)=>{
    username.push(each.username)
    email.push(each.email)
            })
            res.send({data:{usernames:username,emails:email}})
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

