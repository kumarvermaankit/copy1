
import React, { useEffect, useState,useCallback } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";
import "./community.css";
import {Card,Button}from 'react-bootstrap'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import jwt_decode from "jwt-decode";
import None from "./images/None.PNG"
import AddIcon from '@material-ui/icons/Add';
import CodeM from "./cm"
import one from "./images/one.jpg" ;
import five from "./images/five.jpg" ;
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import  { useHistory } from 'react-router-dom'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import GitHubIcon from '@material-ui/icons/GitHub';
import Utubeicon from "@material-ui/icons/YouTube";
import Editor from "@material-ui/icons/Code"
import EditIcon from '@material-ui/icons/Edit';





function Qcode(){
    

  const url=`http://localhost:5000`;

const [CD,setCD]=useState(true)

    let history=useHistory();
    let params=useParams()
    
    const [cstate,setcstate]=useState(false);
    const [imgstate,setimagestate]=useState(false)
    const [linkstate,setlinkstate]=useState(false)
    const [files,setFile]=useState([]);
    const [noi,setnoi]=useState([])
    var [i,seti]=useState(false)
    const [bstate,setbstate]=useState(false);

   const [commentstate,setcommentstate]=useState(false)

const [cmntsetter,setcmntsetter]=useState("")

    const [teditor,setteditor]=useState("");
    const [ceditor,setceditor]=useState("")

    const [activepage,setactivepage]=useState(1)

  

    const[decoded,setdecoded]=useState(null);
   
    var tkn=localStorage.getItem('usertoken');

    var inputid=0;

    var tkn=localStorage.getItem('usertoken');
    
    const [ap,setap]=useState(0)

    

    const [editcode,seteditcode]=useState(false)
    
 const [givencode,setgivencode]=useState("")
    

const [rp,setrp]=useState(0)


const [ansshow,setansshow]=useState([])


var [divstate,setdivstate]=useState([]);


const [comments,setcomments]=useState(false);

const [statearr,setstatearr]=useState(false); 

const [imagestate,setimgstate]=useState(false);

const [info,setinfo]=useState({
  username:"",
   })

 const [availablelinks,setavailablelinks]=useState({
      git:null,
      youtube:null,
      googledrive:null,
      codeeditor:null,
      other:null
    })


const [ansarr,setansarr]=useState([]);


const [cmnt,setcmntstate]=useState([]);

const [answer,setanswer]=useState(false)


const [codestate,setcodestate]=useState(false);




  const [vote,setvote]=useState({})


  const [answerarr,setanswerarr]=useState([])

useEffect(()=>{

    
 
    
        axios.get(`${url}/upload/question/${params.index}/${params.document}/${params.username}`)
        .then((result)=>{
            setansarr(result.data.data)
            setgivencode(result.data.data.question_content)
        })
        .catch((err)=>{
            console.log(err)
        })
   
        if(tkn!==null){
            const token = localStorage.usertoken
            setdecoded(jwt_decode(token))
            
        }


},[rp])

useEffect(()=>{

    startTimer()

    axios.get(`${url}/upload/answer/${params.index}/${params.document}/${params.username}`)
    .then((result)=>{
setanswerarr(result.data.ans)
    })
   .catch((err)=>{
       console.log(err)
   })
},[ap,rp])



var timeoutInMiliseconds = 120000;
var timeoutId; 
 
function startTimer() { 
   
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
 
function doInactive() {
   setrp(rp+1)
}








function AddAnswers(){
 

    
    answer?setanswer(false):setanswer(true);
 
   
}

function Ansstate(ans,username){
  
    try{
       setinfo({
          username:params.username,
       })
          
           }
           catch(err){
              console.log(err);
           }
    
           
 


statearr?setstatearr(false):setstatearr(true)

}



function Showall(divid){

divstate[divid]?
setdivstate((prevvalue)=>{
    return{
        ...prevvalue,
        [divid]:false
    }
})  
:setdivstate((prevvalue)=>{
    return{
        ...prevvalue,
        [divid]:true
    }
})  
}

function showcomments(comment,id){
 
    
    commentstate?setcommentstate(false):setcommentstate(true)

    comment.map((comment)=>{
    cmnt[comment._id]?
setcmntstate((prevvalue)=>{
    return{
        ...prevvalue,
        [comment._id]:false
    }
})  
:setcmntstate((prevvalue)=>{
    return{
        ...prevvalue,
        [comment._id]:true
    }
})
    })
   
}

function Showcode(divid){
  codestate?
setcodestate(false)  
:setcodestate(true) 



}

function Showimage(){
    imagestate?
    setimgstate(false)  
    
    :setimgstate(true)

 

}




async function SendAnswer(id,doc_name,index){
  
const data=new FormData()
    for(const file of files){
        data.append("file",file)
    }
    




  const result= await axios.post(`${url}/upload/addanswer`,{title:teditor,content:ceditor,id:id,document:doc_name,index:index,ansuser:decoded.data.username,links:availablelinks})
  

if(result){
    
      axios.post(`${url}/answer`,data)
      axios.post(`${url}/answer/upload`,{id:id,document:doc_name,index:index,ansindex:Number(result.data.data)})
     
    
        setanswer(false)
   
    
  

}
setFile([])
setavailablelinks({   
  git:null,
  youtube:null,
  googledrive:null,
  codeeditor:null,
  other:null})
  setceditor("")
  setteditor("")
setrp(rp+1)
    
    
}


// function CommentChange(event,inputid){

   

 


  function importAll(r) {
    return r.keys().map(r);
  }
  
  const images = importAll(require.context("../uploads", true, /\.(png|jpe?g|svg|PNG)$/));
  
const ansimages=importAll(require.context("../answerimages",true,/\.(png|jpe?g|svg|PNG)$/))
 





 function Votes(vote_id,document,index,ansvote,ansindex,event){
    
 event.preventDefault();

 

axios.post(`${url}/upload/vote`,{index:index,document:document,ansindex:ansindex})
.then(res=>console.log(res))
.catch(err=>console.log(err));


(vote[vote_id]===undefined && ansvote===true || vote[vote_id]===true)?
setvote((prevvalue)=>{
    return{
        ...prevvalue,
        [vote_id]:false
    }
})
:
setvote((prevvalue)=>{
    return{
        ...prevvalue,
        [vote_id]:true

    }
})
}


function GoTo(event,a){
    event.preventDefault()
    if(a===1){
        cstate?setcstate(false):setcstate(true)
    }
if(a===2){
    imgstate?setimagestate(false):setimagestate(true)
}
if(a===3){
    linkstate?setlinkstate(false):setlinkstate(true)
}

}



function handlePageChange(pageNumber) {
    setactivepage(pageNumber)
    
    axios.post(`${url}/upload/activepage`,{pageNumber:pageNumber})
    window.location.reload();
   }

function imagecheck(s,imgarr){

    var count=0

return(
    <div style={{display:"flex"}}>
  { s.map((each)=>{
     


        for(var h=0;h<imgarr.length;h++){
             
       
     
            if(each.filename==imgarr[h].default.replace('/static/media/','').replace(/\.[^.]*(\.(jpg|jpeg|tiff|png|PNG|JPEG))/g, "$1")){
              count++
                return(
                    <div >
                    <Card.Img className="cardimg"  variant="top" src={imgarr[h].default}/>
                    <p style={{margin:"10px",marginLeft:"130px"}}>{`Fig${count}`}</p>
                    </div>
                ) 
                
              

               }
        
          
        }
                
        })}
    </div>
)
  

         }

         function ansimagecheck(s,imgarr){

            var count=0
        
        return(
            <div style={{display:"flex"}}>
          { s.map((each)=>{
             
                for(var h=0;h<imgarr.length;h++){
                      
               
           
                    if(each.filename==imgarr[h].default.replace('/static/media/','').replace(/\.[^.]*(\.(jpg|jpeg|tiff|png|PNG|JPEG))/g, "$1")){
                      count++
                        return(
                            <div >
                            <Card.Img className="cardimg"  variant="top" src={imgarr[h].default}/>
                            <p style={{margin:"10px",marginLeft:"130px"}}>{`Fig${count}`}</p>
                            </div>
                        ) 
                        
                      
        
                       }
                
                  
                }
                        
                })}
            </div>
        )
          
        
                 }


        






 async function saveinput(doc_name,event,index,comment){
     
    var val=document.getElementById("comment").value

event.preventDefault();
    

   


    const result=await axios.post(`${url}/upload/comment`,{comment:val,useronline:decoded.data.username,index:index,document:doc_name})
  
   

   
setcomments(false)

comment.map((comment)=>{
    cmnt[comment._id]?
setcmntstate((prevvalue)=>{
    return{
        ...prevvalue,
        [comment._id]:false
    }
})  
:setcmntstate((prevvalue)=>{
    return{
        ...prevvalue,
        [comment._id]:true
    }
})
    })
    if(result){
        setrp(rp+1)
    }
   
   
}



async function Delete(event,document,index,id){

   event.preventDefault()
   const r= await axios.post(`${url}/upload/delete/${decoded.data.username}/${id}`,{index:index,document:document})
  if(r){
    history.push("/community",{from:"/qcode"})
  }
   
    
}



function Countdown(props){


const [checker,setchecker]=useState(false)  
var time=Date.parse(props.time)
var currenttime=Date.parse(new Date())

const [secondspassed,setsp]=useState((((currenttime-time)/(1000))-17940))


useEffect(()=>{
   
if(props.d!==extra){


    if((Math.floor(secondspassed/(60*60)) % 24)===0){
        setchecker(true)
    }
else{
    setTimeout(()=>{
        setsp(secondspassed+1)
      

        },1000)
}

}


async function extra(){
    if(secondspassed>=3600){
        const r=await axios.post(`${url}/upload/autodelete`,{document:props.d,index:props.idx})
        if(r){
            axios.post(`${url}/upload/autoupdate`)
            setCD(false)
        }
        
       
    }

}
  if(params.document!=="extra"){
    extra()
  }

     
},[secondspassed])




    
   
    return (
        <div>
          
{checker || props.d==="extra"?<p>TimeUp!</p>:<ul className="CD">



<li className="timer" >{Math.abs((Math.floor(secondspassed/(60*60)) % 24))<10?"0"+Number(Math.abs(Math.floor(secondspassed/(60*60)) % 24)):Number(Math.abs(Math.floor(secondspassed/(60*60)) % 24))}</li>
<li className="timer">{Math.abs(Math.floor(secondspassed/60) % 60)<10?"0"+Math.abs(Math.floor(secondspassed/60) % 60):Math.abs(Math.floor(secondspassed/60) % 60)}</li>
<li className="timer">{Math.abs(secondspassed % 60)<10?"0"+Number(Math.abs(secondspassed % 60)):Math.abs(secondspassed % 60)}</li>

             </ul>}
        </div>
    ) 
   



}




async function Upvote(document,index,ansindex,state,upvotevalue,id,event){
    
    event.preventDefault();
   

   
   
   const res=await axios.post(`${url}/upload/upvote/${state}`,{index:index,document:document,ansindex:ansindex,username:decoded.data.username})
   
   
if(res){
setap(ap+1)
}

}




   const onFileSelected=useCallback((event,i)=>{


 


        event.preventDefault()
        if(files[i]!==undefined){
          files[i]=event.target.files[0]
        }
        else{
          setFile( [...files,event.target.files[0]]);
        }
    
    

      
        
         
        
        var selectedFile = event.target.files[0];
        var reader = new FileReader();
      
        var imgtag = document.getElementById(`myimage${i}`);
        
        
        imgtag.title = selectedFile.name; 
     
        reader.onload = function(event) {
          imgtag.src = event.target.result;
          
        };
      
        reader.readAsDataURL(selectedFile);
    
       
        setbstate(true);
    seti(false)
    

    
    
      })
    

   function SelectFile(props){

  
  
  

    return(
    <div className="input-file-container"> 
  
  
        <label  htmlFor={props.i} className="custom-file-upload"><AddAPhotoIcon style={{width:"40px",height:"70px",color:"white"}}/></label>
        <input 
          type="file"
          id={props.i}
          className="form-control"
          
      onChange={(event)=>onFileSelected(event,props.i)}
        />
       
         </div>
         )
  
  }
  
  
  function addlinks(event,a){
    if(a===1){
      setavailablelinks((prev)=>{
        return {
          ...prev,
          git:event.target.value
        }
      })
    }
    else if(a===2){
      setavailablelinks((prev)=>{
        return {
          ...prev,
          youtube:event.target.value
        }
      })
    }
    else if(a===3){
      setavailablelinks((prev)=>{
        return {
          ...prev,
          googledrive:event.target.value
        }
      })
    }
    else if(a===4){
      setavailablelinks((prev)=>{
        return{
          ...prev,
          codeeditor:event.target.value
        }
      })
    }
    else if(a===5){
      setavailablelinks((prev)=>{
        return{
          ...prev,
          other:event.target.value
        }
      })
    }
  }

  function AddImage(event){
    
    event.preventDefault()
    if(i===false){
      if(noi.length===0){
        setnoi([...noi,0])
    }
      else{
      setnoi([...noi,noi[noi.length-1]+1])
  }
     seti(true)
    }
  
  }
  
  
  function close(event,val){
    event.preventDefault()
    seti(false)
  if(noi.length===1){
    setnoi([])
    setFile([])
  }
  else{
    var i=noi.indexOf(val) 
    console.log(val,i)
    noi.splice(val,1)
    files.splice(val,1)
    setFile([...files])
    setnoi([...noi])
  }
   
  }
  

  
  function CreateImage(){
  
    
  
  
 
    return(
    <div> 
      
  { noi.map((each)=>{
  
    
  
      return(
        <div className="create" key={each}>
      
        <SelectFile i={each}/>
      
      
    <button className="close_btn" style={{background:"none"}} onClick={(event)=>close(event,each)}><HighlightOffIcon /></button>
        <img style={{color:"white"}} id={`myimage${each}`} alt="no-image"/>
       
      
        </div>
       )
    
     
     })}
  </div> 
   
    )  
     
        
       
    
  }


  function importAll(r) {
    return r.keys().map(r);
  }
    
  const images1 = importAll(require.context("../profileimages", true, /\.(png|jpe?g|svg|PNG)$/));

function imagecheck2(s){
    for(var h=0;h<images1.length;h++){
           if(s.data.filename.replace('profileimages',"").replace('\\',"")==images1[h].default.replace('/static/media/','').replace(/\.[^.]*(\.(jpg|jpeg|tiff|png|PNG|JPEG))/g, "$1")){
         
          return images1[h].default
             }
      }
             }


function GetProfile(props){
const [imgsrc,setimgsrc]=useState("")

    useEffect(()=>{
        async function Helper(){
            const res= await axios.get(`${url}/profile/${props.u}`)
          
            if(res){
                setimgsrc(imagecheck2(res))
            }
        }
       
Helper()

    },[])



return(
    <div className="userimageprofile">
    <img src={imgsrc}></img>
    <p className="userprofile" style={{fontWeight:"2000px"}} >{props.u}</p>
        
    </div>
)
    
}


 
function Cmntset(event){
    
    setcmntsetter(event.target.value)
}



function showans(event,id){
    event.preventDefault()

    ansshow[id]?
    setansshow((prevvalue)=>{
        return{
            ...prevvalue,
[id]:false
        }
    })
    :
    setansshow((prevvalue)=>{
        return{
            ...prevvalue,
[id]:true
        }
    })
}


function change1(newvalue){

console.log(newvalue)

setteditor(newvalue)
 
    
}

function change2(newvalue){
    setceditor(newvalue)
}


function editcodechange(newvalue){



setgivencode(newvalue)
}




async function EditCode(event){
event.preventDefault();




const r=await axios.post(`${url}/upload/codeeditor`,{document:params.document,index:params.index,content:givencode})

if(r){
  setcodestate(false)
  seteditcode(false)
}

setrp(rp+1)

}

function Editcodestate(event){
  event.preventDefault()

editcode?seteditcode(false):seteditcode(true)
}



function Quesdiv(props){

  var time=Date.parse(props.time)
var currenttime=Date.parse(new Date())
    return(
<div className="bgrnd">

  <div className="importcard"  key={props.i} >
       <div className="c_header"><Card.Link  onClick={()=>Showall(props.i)}><p style={{padding:"13px"}}><b>{props.t}</b></p>{(props.doc_name==="bronze")?<Card.Img  class="card_img"  src={one}/>:(props.doc_name==="silver")?<Card.Img class="card_img" src={five}/>:(props.doc_name==="gold")?<Card.Img  class="card_img" src={five}/>:(props.doc_name==="extra")?<Card.Img  class="card_img"  src={null}/>:null}</Card.Link><a  href={`/profile/${props.u}`} className="username">~{props.u}</a></div>
       <Card.Text className="questionid">id:{props.i}</Card.Text>
  <Card.Body>
 <p className="linkshowpara">Links:</p>
 {props.links.git!==null?<a  className="links"  href={props.links.git} target="_blank"><GitHubIcon /></a>:null}
 {props.links.youtube!==null?<a  className="links" href={props.links.youtube} target="_blank"><Utubeicon /></a>:null}
 {props.links.googledrive!==null?<a  className="links" href={props.links.googledrive} target="_blank">Google Drive</a>:null}
 {props.links.codeeditor!==null?<a  className="links" href={props.links.codeeditor} target="_blank"><Editor /></a>:null}
 {props.links.other!==null?<a  className="links" href={props.links.other} target="_blank">Other</a>:null}

        <div key={props.i+"childdiv"} id={props.i+"childdiv"}>
    
 
{props.doc_name!=="extra"?<div className="divtimer">
<p >Time Remaining:</p>
{CD?<Countdown time={props.time} d={props.doc_name} idx={props.index} />:<p>0</p>}
</div>:null}
    
   
 
    <Card.Text style={{paddingTop:"0px",cursor:"pointer"}} className="code-secn" onClick={()=>Showcode(props.i)} >
     Code:
     </Card.Text>
    
    {codestate===true?
    <div className="codediv">
    {tkn!==null?decoded.data.username===params.username?<button  onClick={(event)=>Editcodestate(event)} className="codeedit">Edit <EditIcon   style={{width:"28px",height:"28px"}} /></button>:null:null}
    {editcode?<div className="set"><p className="editpara">Editable</p><button className="setedit" onClick={(event)=>EditCode(event)}>Set</button></div>:null}  
{editcode===false?<CodeM name="code" val={givencode} hght="500px" wdt="1400px" read={true} />:<CodeM name="code"  hght="500px" wdt="1400px" read={true} visible="hidden"/>}
  
    
    </div>
    :null
    }
    <Button id="cardbtn"  variant="primary" style={{marginRight:"100px"}}onClick={()=>Ansstate(props.a,props.u)}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>See Answers</Button>
    {tkn!==null?<div className="afterloginbuttons">
   <Button  id="cardbtn"  variant="primary" style={{marginRight:"80px"}} onClick={()=>AddAnswers()}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Add Answer</Button>

    </div>:null}
    
    <Button  id="cardbtn"  variant="primary" style={{marginLeft:"100px" ,marginRight:"100px"}}  onClick={()=>Showimage(props.i)}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Image</Button>
    <Button  id="cardbtn"  variant="primary"  style={{marginLeft:"40px",marginRight:"60px"}}  onClick={()=>showcomments(props.comments,props.i)}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Comments</Button>
      
   {tkn!==null?decoded.data.username===params.username?((currenttime-time)/1000<=900)?<Button  id="cardbtn" variant="primary"  style={{marginLeft:"100px",marginRight:"120px"}}  onClick={(event)=>Delete(event,props.doc_name,props.index,props.i)}><svg className="bts">
        <rect x="0" y="0" fill="none" width="100%" height="100%"/>
      </svg>Delete</Button>:null:null:null}
   { comments[props.i]?<form onSubmit={(event)=>saveinput(props.doc_name,event,props.index,props.comments)}>
    <input  type="text"  id="comment" />
    <button id="cardbtn" type="submit" style={{width:"50px",height:"50px",marginLeft:"10px"}} ><AddIcon  /></button>
    </form>:null}
    
     
    
   
    {imagestate?<div id="images">{imagecheck(props.s,images)}</div>:null}
     {imagestate?(!(imagecheck(props.s,images))?<Card.Img variant="top" src={None}/>:null):null}

     



 
     

</div>


     </Card.Body>
  

<div id="comments" className="displayComments"> 
{commentstate?<h3>Comments:</h3>:null}
{props.comments.map(comment=>{
    
    return(
       
        cmnt[comment._id]?
        <div>
        <Card.Text  className="commentsection">
        {comment.comment}
        </Card.Text>
       <a href={`/profile/${comment.username}`}><GetProfile u={comment.username}/></a>
        </div>
        :null
      
    )
})}
</div>


{statearr?<h3>Answers:</h3>:null}

{answerarr.map(ans=>{

  
 
return (
    
      <div id="answers">
   
       { statearr?
        <div key={ans._id} id={ans._id}>
        <Card.Text style={{cursor:"pointer"}} onClick={(event)=>showans(event,ans._id)} >
         {ans.description}
     </Card.Text>
        {ansshow[ans._id]?
        <div>
   <CodeM val={ans.description} hght="60px" wdt="1200px" read={true} />
        <CodeM val={ans.ans} hght="500px" wdt="1200px" read={true} />
        
        { ansimagecheck(ans.images,ansimages)}
        
        <p style={{display:"inline"}}>links:</p>
 {props.links.git!==null?<a  className="links"  href={props.links.git}  target="_blank" ><GitHubIcon /></a>:null}
 {props.links.youtube!==null?<a  className="links" href={props.links.youtube} target="_blank" ><Utubeicon /></a>:null}
 {props.links.googledrive!==null?<a  className="links" href={props.links.googledrive} target="_blank" >Google Drive</a>:null}
 {props.links.codeeditor!==null?<a  className="links" href={props.links.codeeditor} target="_blank" ><Editor /></a>:null}
 {props.links.other!==null?<a  className="links" href={props.links.other} target="_blank" >Other</a>:null}
        
        </div>
     :null}
    
    
     {tkn!==null?decoded.data.username===props.u?
         <div id={ans._id} style={{cursor:"pointer"}} onClick={(event)=>Votes(ans._id,props.doc_name,props.index,ans.vote,ans.index,event)} >
        
         {vote[ans._id]===undefined?ans.vote?<FavoriteIcon />:<FavoriteBorderIcon />:vote[ans._id]?<FavoriteIcon />:<FavoriteBorderIcon />}
       
         
          </div>:null:null}



{tkn!==null?<div>
      {ans.likedBy.includes(decoded.data.username)===false?<button className="vote" id={ans._id} onClick={(event)=>Upvote(props.doc_name,props.index,ans.index,true,ans.upvote,ans._id,event)}>Up{" "}<ThumbUpIcon /></button>
        :
        <button className="vote" id={ans._id} onClick={(event)=>Upvote(props.doc_name,props.index,ans.index,false,ans.upvote,ans._id,event)}>Down{" "}<ThumbDownIcon /></button>}
       
         <p>{ans.upvote}</p>
       </div>:null}
          </div> 
    :null

}

</div>
    

    )
   
 })}



</div>


 </div>
    )
}






return (
<div>


      <div>
      
    {ansarr===undefined||ansarr.length===0?<p>This Question is either deleted or not in our records</p>:<Quesdiv key={ansarr.id} t={ansarr.question_title} c={ansarr.question_content} v={ansarr.votes} a={ansarr.answer} i={ansarr.id} u={ansarr.username} s={ansarr.imginfo} paymentvalue={ansarr.value.amount} comments={ansarr.comments} doc_name={ansarr.documentname} index={params.index} time={ansarr.time} links={ansarr.links}/>}
      </div>
      



{codestate===true?editcode?<div className="newcode"><CodeM  val={givencode} Change={(newvalue)=>editcodechange(newvalue)} hght="500px" wdt="1400px" read={false} /></div>:null:null}



      {answer?<div id="answer" className="maincard">
      <div className="headcard">
      <div style={{display:"flex"}}>
      <p className="add" >Add Code</p>
     <button className="acCode" onClick={(event)=>GoTo(event,1)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button> 
     </div>
 {cstate?<CodeM Change={(newvalue)=>change1(newvalue)} val={teditor} name={"title"+ansarr.id}   plh="Enter Description"  hght="60px" wdt="1600" read={false} />:null}
{cstate?<CodeM   Change={(newvalue)=>change2(newvalue)} val={ceditor} name={"content"+ansarr.id}   plh="Enter or Copy Code" hght="600px" wdt="1600" read={false}/>:null }
</div>
           
<div className="headcard">
             <div style={{display:"flex"}}>
     <p className="add">Add Image</p>
     <button className="AC" onClick={(event)=>GoTo(event,2)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button>
     </div>
     {imgstate?
       <div style={{display:"flex"}}>
     <p  style={{marginTop:"12px",color:"#000000"}} >New Image</p>
     <button className="AC" style={{width:"28px",height:"30px",left:"5px",top:"14px"}} onClick={(event)=>AddImage(event)}><AddIcon style={{width:"22px",height:"22px",border:"none",position:"relative",right:"6px",bottom:"4px"}} /></button> 
    
     </div>


:null}
{imgstate?CreateImage():null}
     </div>
     <div className="headcard">
   <div style={{display:"flex"}}>
   <p className="add"  >Add Links</p>
     <button className="AC"  onClick={(event)=>GoTo(event,3)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button> 
   </div>
{linkstate?
<div>
<div className="linkdiv">
<label for="git">github(if any):</label>
     <input onChange={(event)=>addlinks(event,1)} className="linkinput" value={availablelinks.git} type="text" id="git" placeholder="Place your github link here"/>
     </div>
     <div className="linkdiv">
     <label for="youtube">youtube(if any):</label>
     <input onChange={(event)=>addlinks(event,2)} className="linkinput" value={availablelinks.youtube} type="text" id="youtube" placeholder="Place your youtube link here"/>
     </div>
     <div className="linkdiv">
     <label for="googledrive">google-drive(if any):</label>
     <input onChange={(event)=>addlinks(event,3)} className="linkinput" value={availablelinks.googledrive} type="text" id="googledrive" placeholder="Place your google drive link here" />
     </div>
     <div className="linkdiv">
     <label for="urcode">your code editor(if any):</label>
     <input onChange={(event)=>addlinks(event,4)} className="linkinput" value={availablelinks.codeeditor} type="text" id="urcode" placeholder="Place your code editor link here" />
     </div>
     <div className="linkdiv">
     <label for="others">other(if any):</label>
     <input onChange={(event)=>addlinks(event,5)} className="linkinput" value={availablelinks.other} type="text" id="others" placeholder="Place any other available link here"/>
     </div>
     </div>
     :null}
  
 </div>
     <button className="send-button" onClick={()=>SendAnswer(ansarr.id,ansarr.documentname,params.index)}>Submit</button>       
</div>
:null
}
        </div>
)



}

export default Qcode