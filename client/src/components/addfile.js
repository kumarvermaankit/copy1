import React, { useState,useEffect,useRef} from "react"
import axios from "axios";
import "./addfile.css";
import jwt_decode from "jwt-decode";
import Axios from "axios"
import "./payment.css" 
import MultiSelect from "react-multi-select-component";
import {useHistory} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import CodeM from "./cm"

import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';

import { createBrowserHistory } from 'history';



function File(){
  let history=useHistory();
  const url=`http://localhost:5000`
 
  var [i,seti]=useState(false)
    const [files,setFile]=useState([]);
    const [bstate,setbstate]=useState(false);
    const [paymentstate,setpaymentstate]=useState(false)
    const [noi,setnoi]=useState([])
    const [imgstate,setimagestate]=useState(false)

    const [istate,setistate]=useState(false)
    const [cstate,setcstate]=useState(false);
    const[question,setquestion]=useState({

      title:"",
      content:"",
      paymentinfo:{}
    })


    const [availablelinks,setavailablelinks]=useState({
      git:null,
      youtube:null,
      googledrive:null,
      codeeditor:null,
      other:null
    })


    const [mstate,setmstate]=useState(false)
    const [selected, setSelected] = useState({
      languages:null,
      fields:null,
      frameworks:null,
      });

    const [info,setinfo]=useState({
      id:"",
      email:"",
      username:"",
     })

     const [linkstate,setlinkstate]=useState(false)
    
    useEffect(()=>{
  setFile([])

 
      try{
      const token = localStorage.usertoken
      const decoded=jwt_decode(token)
      
      
      setinfo({
         id:decoded.data._id,
         email:decoded.data.email,
         username:decoded.data.username,
     });
        
         }
         catch(err){
            console.log(err);
         }

var val=document.getElementsByTagName("span")
if(cstate===true){
  val[1].innerHTML="languages"
  val[2].innerHTML="fields"
  val[3].innerHTML="frameworks"
}



       },[])


function Lstate(event){
event.preventDefault()

linkstate?setlinkstate(false):setlinkstate(true)
}


  function OnChangetitle(newvalue){
 
    setquestion((prevvalue)=>{
    return{
      ...prevvalue,
      title:newvalue
    }
    })
    console.log(question)
  }
    function OnChangecontent(newvalue){
 
      setquestion((prevvalue)=>{
      return{
        ...prevvalue,
        content:newvalue
      }
      })
      console.log(question)
    }
   



  




 
  function onFileSelected(event,i) {






 
 


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






  }

  

  


    const send= async event=>{
      const data= new FormData();
    for(const file of files){
      data.append("file",file);
    }
     
  
 

      const r=await axios.post(`${url}/upload`,data)
    

if(r){
  const result=await axios.post(`${url}/upload/question`,{question:question,info:info,keywords:selected,links:availablelinks})
  if(result){
    await setFile([])
    
    history.push("/community",{from:"/file"})
  }
  
}
   
    

   
    
    
    }

  

    const languages=[
      {label:"javascript",value:"javascript"},
      {label:"java",value:"java"},
      {label:"python",value:"python"},
      {label:"C++",value:"C++"},
      {label:"C",value:"C"},
      {label:"ruby",value:"ruby"},
      ]
      
      const fields=[
      {label:"Web-Development",value:"WebD"},
      {label:"Android-Development",value:"Android"},
      {label:"UI-UX",value:"uix"},
      {label:"Data-Structures and Algorithms",value:"DSA"},
      {label:"Competitive-Codeing",value:"CC"},
      {label:"AI and ML",value:"AM"},
      ]

      const frameworks=[
        {label:"Django",value:"Django"}
      ]

 const GoToCode=event=>{
   event.preventDefault();
   cstate?setcstate(false): setcstate(true);
 
 }
 function dropValueGetter(value,a){
  if(a===1){
      setSelected((prevvalue)=>{
          return{
              ...prevvalue,
              languages:value
          }
      })
  }
  else if(a===2){
      setSelected((prevvalue)=>{
          return{
              ...prevvalue,
              fields:value
          }
      })
  }
  else if(a===3){
      setSelected((prevvalue)=>{
          return{
              ...prevvalue,
              frameworks:value
          }
      })
  }

 

 
}





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

console.log(files)

function CreateImage(){

  



  return(
  <div> 
    
{ noi.map((each)=>{

  

    return(
      <div className="create" key={each}>
    
      <SelectFile i={each}/>
    
    
  <button className="close_btn" style={{background:"none"}} onClick={(event)=>close(event,each)}><HighlightOffIcon /></button>
      <img className="addimg" style={{color:"white"}} id={`myimage${each}`} alt="no-image"/>
     
    
      </div>
     )
  
   
   })}
</div> 
 
  )  
   
      
     
  
}



 function Razorpay(){

  const token = localStorage.usertoken
  const decoded=jwt_decode(token)




  const[hndrd,sethndrd]=useState(false)
  const[two,settwo]=useState(false)
  const[five,setfive]=useState(false)
  const[ten,setten]=useState(false)



async function razorPayPaymentHandler(money) {

 
  

    const API_URL = `${url}/payment/`
    const orderUrl = `${API_URL}order/${money}`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    console.log("App -> razorPayPaymentHandler -> data", data)
    
    const options = {
      key: '',
      name: decoded.data.username,
      description: "This is a description",
      order_id: data.id,
      handler: async (response) => {
        try {
         const paymentId = response.razorpay_payment_id;
         const url = `${API_URL}capture/${paymentId}/${money}`;
         const captureResponse = await Axios.post(url, {})
         const successObj = JSON.parse(captureResponse.data)
         const captured = successObj.captured;
         
         console.log("App -> razorPayPaymentHandler -> captured", successObj)
         if(captured){
             console.log('success')
             setquestion((prevvalue)=>{
               return{
                 ...prevvalue,
                 paymentinfo:successObj
               }
             })
            
            }
           
         } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
   
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  }


  


function Card(props){
  return(
<div className="carddiv"  >
      <button 
      onClick={()=>razorPayPaymentHandler(props.amount)}
      className="btn "
      
      >
         {props.amount} 
        
      </button>
      <p className="idiv" id={props.hours}> For Rs {props.amount} {`->`} {props.hours} hours</p>
      </div>
  )
}

return (
    <div className="Pdiv">
     <div  className="carddiv" style={{marginLeft:"0"}}>
       <button className="btn">Free</button>
       <p id="free" className="idiv">Free! Free! Free!</p>
     </div>
  <Card  amount="3" state={two} hours="6"/>
  <Card   amount="5" state={five} hours="3"/>
  <Card  amount="10" state={ten} hours="1"/>


  
    </div>
  )
}    



function Paystate(event){
event.preventDefault()

paymentstate?setpaymentstate(false):setpaymentstate(true)

}


function Imagestate(event){
  event.preventDefault()

imgstate?setimagestate(false):setimagestate(true)
}


function mainstate(event){
event.preventDefault()

mstate?setmstate(false):setmstate(true)
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

    return (

    
     
      <div className="maincard" id="maincard">
      
      <p onClick={(event)=>mainstate(event)}  style={{color:"black",textAlign:"center",marginTop:"20px",cursor:"pointer",fontSize:"60px"}}>Post your Question here</p>
       

       {mstate? 
         <div className="inputdiv">
    <form action="#">

    <div className="headcard">
    <div style={{display:"flex"}}>
  
     <p className="add" >Add Code</p>
     <button className="acCode" onClick={(event)=>GoToCode(event)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button> 
     </div>
{cstate?
<label for="keyword">Keywords</label>:null}
     {cstate?<div id="keywords"><MultiSelect
        className="drop-down"
        options={languages}
        value={selected.languages}
        onChange={(value)=>dropValueGetter(value,1)}
        labelledBy={"languages"}
        required={true}
      />
<MultiSelect
        className="drop-down"
        options={fields}
        value={selected.fields}
        onChange={(value)=>dropValueGetter(value,2)}
        labelledBy={"fields"}
        required={true}
      />
      <MultiSelect
        className="drop-down"
        options={frameworks}
        value={selected.frameworks}
        onChange={(value)=>dropValueGetter(value,3)}
        labelledBy={"frameworks"}
        required={true}
      /></div>:null}
     
{cstate?<CodeM   Change={OnChangetitle}  val={question.title} name="title" plh="Enter Question"  hght="60px" wdt="1450" />:null}  
{cstate?<CodeM   Change={OnChangecontent}  val={question.content} name="content" plh="Enter or Copy Code" hght="400px" wdt="1450" />:null} 

</div>
 
     
 <div className="headcard">
<div style={{display:"flex"}}>
     <p className="add"  >Add Images</p>
     <button className="AC"  onClick={(event)=>Imagestate(event)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button> 
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
     <button className="AC" style={{left:"20px"}} onClick={(event)=>Lstate(event)}><AddIcon style={{width:"35px",height:"35px",border:"none"}} /></button> 
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
 </form>

 <div className="headcard">
<a style={{marginLeft:"580px",cursor:"pointer",color:"#ece2e1"}} onClick={(event)=>Paystate(event)}>Payment Options</a>
{paymentstate?<section className="mid-section">
      

        <Razorpay />
  
        </section>:null}
</div>




     
   
       
 

     

   
         
            <button onClick={send} className="send-button" >POST</button>
            </div>
         :null}
     
         
        </div>
       
       
        
      
    )


}

export default File;