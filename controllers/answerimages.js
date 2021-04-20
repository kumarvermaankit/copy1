const express=require("express");
const cors= require("cors");
const mongoose=require("mongoose");
const multer=require("multer");

const router=express.Router();
const Question=require("../models/Question");


const app= express();
app.use("./client/src/answerimages",express.static('answer'));
app.use(cors());

var storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        
        cb(null,"./client/src/answerimages");
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
    });

const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image.jpeg' || file.mimetype==='image.png' ){
        cb(null,true)
    }
    else{
       cb(null,false)
    }
}    

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*5
    }
    
})

var imgobj=[]

router.post("/",upload.array("file",10),(req,res,next)=>{
    console.log(req.files,"h")
try{
    req.files.map((each)=>{
        imgobj.push(each)
    })
    res.send({data:true})
    
}
catch(err){
    console.log(err)
}
})

router.post("/upload",(req,res,next)=>{
    console.log("sajbja")
    Question.findOne({documentname:req.body.document})
    .then((result)=>{
        
        result.questions[req.body.index].answer[req.body.ansindex].images=imgobj
        result.save()
        res.send({data:true})
        return
    })
    .catch((err)=>{
        console.log(err) 
    })
})





module.exports=router