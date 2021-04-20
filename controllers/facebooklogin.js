
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
const fetch = require('node-fetch');



router.post("/",(req,res)=>{

const {userID,accessToken}=req.body;

let urlGraphFacebook=`https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`

fetch(urlGraphFacebook,{
    method:"GET"
})
.then(res=>res.json())
.then(response=>{
    const {email,name}=response;
    UserProfile.findOne({email:email}).then(user=>{

         if(user){
                try{
                const payLoad={
                    _id:user._id,
                    email:user.email,
                    username:user.username,
                    activestatus:user.ActiveStatus,
                    realcoins:user.RealCoins,
                    bonuscoins:user.BonusCoins
        
                     }
                    var token= jwt.sign({data:payLoad},secretkey,{
                        expiresIn:1440
                    });
           
                    res.send(token)
                }

                catch(err){
                    console.log(err);
                }
            }
            else{
                let password=email+process.env.SECRET;
                const newUser= {
                    email:email,
                    username:name,
                   password:password,
                   ActiveStatus:false,
                   RealCoins:0,
                   BonusCoins:0
                   
                   }
                   UserProfile.create(newUser).then((err,info)=>{
                       if(err){
                        return res.status(400).json({
                            error:"Something Went Wrong"
                        })
            }
            const payLoad={
                _id:info._id,
                email:info.email,
                username:info.username,
                activestatus:info.ActiveStatus,
                realcoins:info.RealCoins,
                bonuscoins:info.BonusCoins
    }
                var token= jwt.sign({data:payLoad},secretkey,{
                    expiresIn:1440
                });
       
                res.send(token)
                   })
                   .catch(err=>console.log(err));

                    
            
            
                }
        
    })
})
})

module.exports=router;