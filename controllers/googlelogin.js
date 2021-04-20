
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
const {OAuth2Client} = require("google-auth-library");

const client= new OAuth2Client("332494597752-f27u8a4kn43kv3v69j8891lcq5varrkl.apps.googleusercontent.com")

const app = express();






app.use(cookieParser());
app.use(cors());

const UserProfile=require("../models/UserProfile.models");



router.post("/",(req,res)=>{
    const {tokenId}=req.body;
    
    
    client.verifyIdToken({idToken: tokenId, audience:"332494597752-f27u8a4kn43kv3v69j8891lcq5varrkl.apps.googleusercontent.com"}).then(response=>{
    
        const {email_verified,name,email}=response.payload
    
if(email_verified){
        UserProfile.findOne({email:email}).then((user,err)=>{

            if(err){
                return res.status(400).json({
                    error:"Something Went Wrong"
                })
            
            }
            
                if(user){
                    try{
                    const payLoad={
                        _id:user._id,
                        email:user.email,
                        username:user.username,
                        questions:user.questions,
                        images:user.images
            
                         }
                        var token= jwt.sign({data:payLoad},secretkey,{
                            expiresIn:1440
                        });
               
                        res.send(token)
                        console.log(token)
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
                        questions:[],
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
                   
                
        }
                    var token= jwt.sign({data:payLoad},secretkey,{
                        expiresIn:1440
                    });
           
                    res.send(token)
                       })
                       .catch(err=>console.log(err));
    
                        
                
                
                    }
            
        })
    }
    })
    .catch(err=>console.log(err));
    
    })

    module.exports=router;