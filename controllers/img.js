
const express=require("express");
const cors= require("cors");
const mongoose=require("mongoose");
const multer=require("multer");

const router=express.Router();
const Question=require("../models/Question");
const UserProfile=require("../models/UserProfile.models");

const app= express();
app.use("./client/src/uploads",express.static('uploads'));
app.use(cors());
var uniqid = require('uniqid');





var darray=[];
var darray1=[];
var darray2=[];

var imgobject=[]

var users=[]

var questionids=[]

var storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        
        cb(null,"./client/src/uploads");
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








router.get("/allusers",(req,res,next)=>{
    UserProfile.find()
    .then((result)=>{
        result.map((each)=>{
            users.push(each.username)
        })

        res.send({data:users})
        users=[]
        return
    })
    .catch((err)=>{
        res.send({data:false})
    })


    
})






router.post("/usernamechange",(req,res,next)=>{


    UserProfile.findOne({username:req.body.oldusername})
    .then((result)=>{
        result.username=req.body.username
        result.save()
        res.send({data:true})
        return
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get("/info/:username",(req,res,next)=>{


    UserProfile.findOne({username:req.params.username})
    .then((result)=>{
        
        res.send({data:{phone:result.phone_number,college:result.college,upi:result.upi_id,skills:result.skills,answered:result.answered,email:result.email}})
    })
})

router.post("/phone",(req,res,next)=>{


    UserProfile.findOne({username:req.body.username})
    .then((result)=>{
       result.phone_number=req.body.phone
       result.save()
       res.send({data:true})
       return
    })
    .catch((err)=>{
        res.send({data:err})
    })
})

router.post("/college",(req,res,next)=>{


    UserProfile.findOne({username:req.body.username})
    .then((result)=>{
       result.college=req.body.college
       result.save()
       res.send({data:true})
       return
    })
    .catch((err)=>{
        res.send({data:err})
    })
})

router.post("/upi",(req,res,next)=>{


    UserProfile.findOne({username:req.body.username})
    .then((result)=>{
       result.upi_id=req.body.upi
       result.save()
       res.send({data:true})
       return
    })
    .catch((err)=>{
        res.send({data:err})
    })
})


router.post("/addskill",(req,res,next)=>{
   
console.log(req.body)

UserProfile.findOne(({username:req.body.username}))
.then((result)=>{
    console.log(result.skills)
    result.skills=req.body.skills;
    
    result.save();
    res.send({data:true});
    return;
})
.catch((err)=>{
    res.send({data:err})
})
})






router.post("/",upload.array("file",10),(req,res,next)=>{

console.log(req.files)

try{
    req.files.map((each)=>{
        imgobject.push(each)
    })
res.send({data:true})
  
}
catch(err){
console.log(err);
}    


})



router.post("/question",(req,res,next)=>{
    req.connection.setTimeout( 1000 * 60 * 10 );

   
const t=imgobject

    var index_no=0

    var id=uniqid(req.body.info.username)

    var time=new Date()

    var documentname;

    if((req.body.question.paymentinfo.amount)/100===10){
        documentname="gold"
    }
    else if((req.body.question.paymentinfo.amount)/100===5){
        documentname="silver"
    }
    else if((req.body.question.paymentinfo.amount)/100===3){
        documentname="bronze"
    }
    else{
        documentname="extra"
    }

    const newdocument={
        documentname:documentname,
        questions:[{
            imginfo:t,
            question_title:req.body.question.title,
            question_content:req.body.question.content,
            answer:[],
        username:req.body.info.username,
        time:time,
        id:id,
        comments:[],
        value:req.body.question.paymentinfo,
        documentname:documentname,
        keywords:{
            language:req.body.keywords.languages,
            framework:req.body.keywords.frameworks,
            field:req.body.keywords.fields
        },
        index_no:index_no,
        links:req.body.links 
        }]
    }
    
    try{
        Question.findOne({documentname:documentname})
        
        .then((result)=>{
        
             if(!result || result===null){
                 Question.create(newdocument)
             }
            else{
                 index_no=result.questions.length;
                result.questions.push({
                    
                    
                    question_title:req.body.question.title,
                    question_content:req.body.question.content,
                    answer:[],
                    imginfo:t,
                username:req.body.info.username,
                time:time,
                id:id,
                    value:req.body.question.paymentinfo,
                    documentname:documentname,
                    keywords:{
                        language:req.body.keywords.languages,
                        framework:req.body.keywords.frameworks,
                        field:req.body.keywords.fields
                    },
                    index_no:index_no,
                    links:req.body.links
                    
                })
                result.save();
             
           
            }
            res.send({data:true})
         
        })
      .catch(err=>console.log(err));
        
    }
    catch(err){
        console.log(err);
    }

try{
    UserProfile.findOne({email:req.body.info.email})
    .then((result)=>{
        result.questions.push({
            question_id:id,
            index_no:index_no,
            docname:documentname
        })
        result.save();
    })
  
}
catch(err){
console.log(err)
}


imgobject=[]


})

var activepage=1;
var no_of_questions=0;

router.post("/activepage",(req,res,next)=>{
activepage=req.body.pageNumber;

res.send({data:true})
})

router.get("/",(req,res,next)=>{
    req.connection.setTimeout( 1000 * 60 * 10 );
  
 
  
   async function Main(){
    try{     
       const result= await Question.find()
        result.map(res=>{
       
                res.questions.map((each)=>{
                     var idx=res.questions.indexOf(each)
                    if(darray.length<(5*activepage)){
                        darray.push({info:each,index:idx}) 
                       no_of_questions++;
                    }
                })
          
       
            
            if(darray.length>5*(activepage-1)){
                darray.splice(0,(5*(activepage-1)))
            }

            

        
         
        
        
        
               
        })
        
        
        
        
        }
        catch(err){
        console.log(err);
        }

      return darray
    }
      
    Main()
    .then((darr)=>{
        try{
            res.send({arr:darr,pagenumber:activepage,no_of_questions:no_of_questions});
        darray=[];
        refreshcontroller--
        no_of_questions=0;
        }
        catch(err){
            console.log(err);
        }
    })

   
    



})

router.get("/question/:index/:document/:username",(req,res,next)=>{
    
  
    try{
        Question.findOne({documentname:req.params.document})
        .then((result)=>{
        
            res.send({data:result.questions[req.params.index]})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
})


router.get("/search/:field/:language/:framework/:string",(req,res,next)=>{
    req.connection.setTimeout( 1000 * 60 * 10 );
 

var lstr=req.params.language;
lstr=lstr.split(",")
for(var i=0;i<lstr.length;i++){
    if(lstr[i]==="C  "){
        lstr[i]="C++"
    }
}
 var fstr=req.params.field;
 fstr=fstr.split(",")

 var frstr=req.params.framework;
 frstr=frstr.split(",")

Question.find()
.then((result)=>{
    if(result){
    result.map((each)=>{
        each.questions.map((res)=>{
            var count=0
            if(darray2.length<(10*activepage)){
                if(res.keywords["field"]!==null){
                res.keywords["field"].map((f)=>{
                    fstr.map((e)=>{
                        
                        if(f.value===e){
                            var idx=each.questions.indexOf(res)
                            darray2.push({info:res,index:idx})
                            count++
                        }
                    })
                })
            }
                if(count>0){
                    return
                }
                if(res.keywords["language"]!==null){
                res.keywords["language"].map((l)=>{
                    lstr.map((e)=>{
                         

                        if(l.value===e){
                            var idx=each.questions.indexOf(res)
                            darray2.push({info:res,index:idx})
                            return
                        }
                    })
                })
            }
                if(count>0){
                    return
                }
                if(res.keywords["framework"]!==null){
                res.keywords["framework"].map((f)=>{
                    frstr.map((e)=>{
                        if(f.value===e){
                            var idx=each.questions.indexOf(res)
                            darray2.push({info:res,index:idx})
                            return
                        }
                    })
                })
            }
                if(count>0){
                    return
                }
                   
                  
                   

                 var array=[];
                 var nof=0
                 array=req.params.string.split(" ");
                
  

                 var notincludearray=["what","which","how","is","are"]

                 for(var i=0;i<array.length;i++){
                     if(array[i]===res.id){
                        var idx=each.questions.indexOf(res)
                        darray2.push({info:res,index:idx})
                        return
                     }
                     if(array[i].length>2){
                     if((res.question_title.toLowerCase()).includes(array[i].toLowerCase())&&notincludearray.includes(array[i].toLowerCase())===false){
                        var idx=each.questions.indexOf(res)
                        darray2.push({info:res,index:idx})
                         return;
                        }
                    }
                 
                 }
           
                
             
            }
            
        })
    })
}
else{
    res.send("No search results found")
}
if(darray2.length===0){
    darray2.push(null)
}
no_of_questions=darray2.length;

if(darray2.length>10*(activepage-1)){
    darray2.splice(0,(10*(activepage-1)))
}
try{
    res.send({arr:darray2,pagenumber:activepage,no_of_questions:no_of_questions});
darray2=[];

no_of_questions=0;
}
catch(err){
    console.log(err);
}
})
})

router.get('/mq/:username',(req,res,next)=>{
var username=req.params.username;



UserProfile.findOne({username:username})
.then((result)=>{
    result.questions.map((each)=>{
        questionids.push({document:each.docname,id:each.question_id})
    })
    res.send({data:true})
})
})

router.get("/myquestions",(req,res,next)=>{
    req.connection.setTimeout( 1000 * 60 * 10 );
    





async function helper(){


    
    async function myq(dname,idx){
    
        const result= await Question.findOne({documentname:dname})
        
            if(result){
                result.questions.map((each)=>{
                var ind=result.questions.indexOf(each)
                
                   if(each.id==idx){
                    darray1.push({info:each,index:ind})
                   }
         
                })
           
            }


            questionids=[]
           
          
            
            no_of_questions=darray1.length;
            
            if(darray1.length>10*(activepage-1)){
                darray1.splice(0,(10*(activepage-1)))
            }
         
        }



      

for(var i=0;i<questionids.length;i++)
{
    var dname=questionids[i].document
    var idx=questionids[i].id
 
    myq(dname,idx)



}

}

helper()
try{
if(darray1.length===0){
    darray1.push(null)
}
res.send({arr:darray1,pagenumber:activepage,no_of_questions:no_of_questions});
darray1=[];

no_of_questions=0;
}
catch(err){
    console.log(err);
}

})

var refreshcontroller=2

router.get("/r/d",(req,res,next)=>{

    if(refreshcontroller<1){
        refreshcontroller=2
    }

    req.connection.setTimeout( 1000 * 60 * 10 );
   
})


router.get("/answer/:index/:document/:username",(req,res,next)=>{

try{
    Question.findOne({documentname:req.params.document})
    .then((ques)=>{
      
        res.send({ans:ques.questions[req.params.index].answer})
    })
    .catch((err)=>{
     console.log(err)
    })
}
catch(err){
    res.send(err)
}

  
})

router.post("/addanswer",(req,res,next)=>{
    var l;

    var id=uniqid(req.body.ansuser)

    
    try{
        Question.findOne({documentname:req.body.document})
        .then((ques)=>{
     
            if(ques.questions[req.body.index].answer.length===0){
    l=0
            }
    else{
    
        l=ques.questions[req.body.index].answer.length
    
    }
    
    
            ques.questions[req.body.index].answer.push({
                description:req.body.title,
                ans:req.body.content,
                userwhoanswerd:req.body.ansuser,
                vote:false,
                index:l,
                id:id,
                links:req.body.links
            })
               
             
              
           
            ques.save();
            res.send({data:l})
    
            return 
        })
        .catch(err=>console.log(err));
    }
catch(err){
    res.send(err)
}
    


    try{
        
        UserProfile.findOne({username:req.body.ansuser})
        .then((result)=>{
           var t=result.answered.length
            result.answered.push({
                docname:req.body.document,
                question_index:req.body.index,
                answerindex:l,
                index:t,
                id:id
            })
            
            return result.save()
        })
        .catch((err)=>{
            console.log(err)
        })
    }
catch(err){
    console.log(err)
}
    
})

var q;

router.post("/autodelete",(req,res,next)=>{
   
q=""


    try{
        Question.findOne({documentname:req.body.document})
        .then((result)=>{

         result.questions[req.body.index].documentname="extra"
         

         
         q=result.questions[req.body.index]
     
         result.questions.splice(req.body.index,1)
         result.save()
         res.send({data:true})
         return
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    catch(err){
        console.log(err)
    }
   


})



router.post("/autoupdate",(req,res,next)=>{

    var user=q.username
    var id=q.id
    try{
    Question.findOne({documentname:"extra"})
    .then((result)=>{
        result.questions.push(q)
        result.save()
        q=""
    })
}
catch(err){
    console.log(err)
}


try{
    UserProfile.findOne({username:user})
    .then((result)=>{
        result.map((each)=>{
            if(each.question_id===id){
                each.docname="extra"
                return
            }
        })
    })
}
catch(err){
    res.send(err)
}



})


router.post("/vote",(req,res,next)=>{

    req.connection.setTimeout( 1000 * 60 * 10 );
    

   Question.findOne({documentname:req.body.document})
    .then((ques)=>{
     
        ques.questions[req.body.index].answer[req.body.ansindex].vote=!(ques.questions[req.body.index].answer[req.body.ansindex].vote)
        return ques.save();
  })
       
    
})

router.post("/comment",(req,res)=>{
    req.connection.setTimeout( 1000 * 60 * 10 );
     
    try{
    Question.findOne({documentname:req.body.document})
    .then((ques)=>{
        ques.questions[req.body.index].comments.push({comment:req.body.comment,username:req.body.useronline})
           
       res.send({data:true})
        return ques.save();
    })
    .catch(err=>console.log(err))
}
catch(err){
    console.log(err)

}
})



router.post("/delete/:username/:questionid",(req,res)=>{
    req.connection.setTimeout( 1000 * 60 * 10 );
    
try{
    Question.findOne({documentname:req.body.document})
    .then((ques)=>{
        ques.questions[req.body.index]=ques.questions[ques.questions.length-1]
        ques.questions.pop()
res.send({data:true})
        return ques.save();
    })
}
catch(err){
console.log(err)
}

try{
    UserProfile.findOne({username:req.params.username})
    .then((result)=>{
     for(var i=0;i<result.questions.length;i++){
         if(result.questions[i].question_id===req.params.questionid){
             
             result.questions[i]=result.questions[result.questions.length-1]
             result.questions.pop()
             break;
         }
     }
     return result.save()
    })
}
catch(err){
console.log(err)
}
})


router.post("/codeeditor",(req,res)=>{
    

console.log(req.body)

    try{
Question.findOne({documentname:req.body.document})
    .then((result)=>{
        result.questions[req.body.index].question_content=req.body.content;
        
        result.save()
        res.send({data:true})
        return
    })
    .catch((err)=>{
        res.send(err)
    })
}
catch(err){
res.send(err)
}

})


router.post("/upvote/:state",(req,res)=>{
  


    try{
        Question.findOne({documentname:req.body.document})
        .then((result)=>{
            

            if(req.params.state==="true"){
                result.questions[req.body.index].answer[req.body.ansindex].upvote=result.questions[req.body.index].answer[req.body.ansindex].upvote+1
                result.questions[req.body.index].answer[req.body.ansindex].likedBy.push(req.body.username)
            }
            else if(req.params.state==="false"){
                result.questions[req.body.index].answer[req.body.ansindex].upvote=result.questions[req.body.index].answer[req.body.ansindex].upvote-1
                var idx=result.questions[req.body.index].answer[req.body.ansindex].likedBy.indexOf(req.body.username)
                result.questions[req.body.index].answer[req.body.ansindex].likedBy.splice(idx,1)
            }
        
            result.save()
            res.send({data:true})
      return  
        })
    }
    catch(err){
        console.log(err)
    }
})






module.exports=router;

