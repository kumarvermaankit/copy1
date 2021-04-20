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




router.post("/passwordchecker",(req,res,next)=>{
    try{
        UserProfile.findOne({username:req.body.username})
        .then((result)=>{
            if(bcrypt.compareSync(req.body.oldpassword,result.password)){
                res.send({data:true})
                return
            }
            else{
                res.send({data:false})
                return
            }
        })
        .catch((err)=>{
            res.json(err)
            res.send({data:false})
        })
    }
  
catch(err){
    res.send(err)
}

})


router.post("/changepassword",(req,res,next)=>{
    UserProfile.findOne({email:req.body.email})
    .then((result)=>{
        bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
            result.password=hash
            result.save()
            res.send({data:true})
            return
        })
    })
    .catch((err)=>{
        res.json(err)
        res.send({data:false})
    })
})

module.exports=router;