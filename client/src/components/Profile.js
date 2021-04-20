import React, { useEffect, useState } from "react"
import jwt_decode from "jwt-decode"
import axios from "axios"
import { useAppContext } from "./lib/contextlib";
import "./profile.css"
import MultiSelect from "react-multi-select-component";
import { useHistory, useParams } from "react-router";
import EditIcon from '@material-ui/icons/Edit';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
function Profile(){

  const url=`http://localhost:5000`

let params=useParams()
  var tkn=localStorage.getItem('usertoken');
  var token;
  var decoded;


  var anslength=0

  if(tkn!==null){
    
     token = localStorage.usertoken
    decoded=jwt_decode(token)
  }

    const{isAuthenticated,userHasAuthenticated}=useAppContext();
    const [pswlength,setpswlength]=useState(false)
    let history=useHistory()
    const [l,setl]=useState("")
    const [file,setfile]=useState(null)
    const [psrc,setpsrc]=useState()
    const [pstate,setpstate]=useState(false)
    const [users,setusers]=useState([])
    const [info,setinfo]=useState({
      skills:[],
      answered:[]
    })

const [pswstate,setpswstate]=useState(false)

    const [ph,setph]=useState(false)
    const [clg,setclg]=useState(false)
    const [upi,setupi]=useState(false)
    var tkn=localStorage.getItem('usertoken');
    const [myw,setmyw]=useState(false)
    const [rp,setrp]=useState(0)
    const [imgp,setimgp]=useState(0)
    const [userp,setuserp]=useState(false)
    const [pfield,setpfield]=useState(false)
    const [npfield,setnpfield]=useState()
    const [para,setpara]=useState()
    const [skills, setskills] = useState();

const [sl,setsl]=useState(false)
const [sfr,setsfr]=useState(false)
const [sf,setsf]=useState(false)

      const skls=[
        {label:"javascript",value:"javascript"},
        {label:"java",value:"java"},
        {label:"python",value:"python"},
        {label:"C++",value:"C++"},
        {label:"C",value:"C"},
        {label:"ruby",value:"ruby"},
        {label:"Web-Development",value:"WebD"},
        {label:"Android-Development",value:"Android"},
        {label:"UI-UX",value:"uix"},
        {label:"Data-Structures and Algorithms",value:"DSA"},
        {label:"Competitive-Codeing",value:"CC"},
        {label:"AI and ML",value:"AM"},
        {label:"Django",value:"Django"}
        ]
        
       


    function importAll(r) {
        return r.keys().map(r);
      }
        
      const images = importAll(require.context("../profileimages", true, /\.(png|jpe?g|svg|PNG)$/));

    function imagecheck(s){
        for(var h=0;h<images.length;h++){
               if(s.data.filename==images[h].default.replace('/static/media/','').replace(/\.[^.]*(\.(jpg|jpeg|tiff|png|PNG|JPEG))/g, "$1")){
              setpsrc(images[h].default)
              return
                 }
          }
                 }


                 

    useEffect(()=>{


        setl(window.location)
        

          if(tkn!==null){
            const token = localStorage.usertoken
            var decoded=jwt_decode(token)
          }
          
        
         
        if(decoded){
           
          axios.get(`${url}/profile/${params.username}`)
          .then((result)=>{
            imagecheck(result)
          })
          .catch((err)=>{
            console.log(err)
          })
           
         
             
          axios.get(`${url}/upload/info/${params.username}`)
          .then((result)=>{
            setinfo(result.data.data)
          })
          .catch((err)=>{
            console.log(err)
          })


        }
        
        
        
        },[imgp])





var timeoutInMiliseconds = 120000;
var timeoutId; 
 
function startTimer() { 
   setusers([])
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
}
 
function doInactive() {
   setrp(rp+1)
}



if(info.answered.length<5){
  anslength=5
  
}
else if(info.answered.length<25){
  anslength=25
}
else if(info.answered.length<25){
  anslength=50
}

useEffect(()=>{


  axios.get("/${url}/upload/allusers")
  .then((result)=>{
    
    setusers(result.data.data)
  })


        
},[rp])





       async function sendimage(){

            const token = localStorage.usertoken
            var decoded=jwt_decode(token)
            
          console.log(file)
          var data=new FormData();
          data.append("file",file)
         


           axios.post("/profile",data)
          
         
            axios.post("/profile/upload",{username:params.username})
         
        
          
          
          
          
          }



          function Setprofile(event){
console.log(event.target.files[0])
            setfile(event.target.files[0])
          }

          function openwindow(){
            myw?setmyw(false):setmyw(true)
            }


            function Imagewindow(){

                return(
                  <div style={{display:"flex",marginTop:"20px"}}>
                  <label  htmlFor="pro" className="custom-file-upload"  style={{height:"20px",marginRight:"20px",fontSize:"30px"}}>Select</label>
                    <input type="file" id="pro" onChange={(event)=>Setprofile(event)}/>
                    
                    <button style={{color:"black",marginTop:"7px",fontSize:"25px"}} onClick={()=>sendimage()}>Upload</button>
                  </div>
                )
                
                }

                async function Logout(){

                    
                    
                    await localStorage.removeItem('usertoken')
                    userHasAuthenticated(false);
                     
                    history.push("/signin");
                    }

 
async function Change(event,a){

event.preventDefault()


const token = localStorage.usertoken
var decoded=jwt_decode(token)
if(a===1){
  var val=document.getElementById("username").value
  if(para===true){
    const t=await axios.post("/${url}/upload/usernamechange",{username:val,oldusername:params.username})
    if(t){
      Logout()
  }
  }
}

if(a===2){
  var val=document.getElementById("phone").value

    const t=await axios.post("/${url}/upload/phone",{phone:val,username:params.username})
    if(t){
      setimgp(imgp+1)
      setph(false)
  }
}

if(a===3){
  var val=document.getElementById("college").value

  const t=await axios.post("/${url}/upload/college",{college:val,username:params.username})
  if(t){
    setimgp(imgp+1)
    setclg(false)
}
}

if(a===4){
  var val=document.getElementById("upi").value

  const t=await axios.post("/${url}/upload/upi",{upi:val,username:params.username})
  if(t){
    setimgp(imgp+1)
    setupi(false)
}
}

}




async function User(event){
  event.preventDefault()

  if(users.includes(event.target.value)){
    setpara(false)
  }
  else{
    setpara(true)
  }

  setrp(rp+1)
}


async function Pswrdchecker(event){
    event.preventDefault()

    const token = localStorage.usertoken
var decoded=jwt_decode(token)

var val=document.getElementById("oldpassword").value

    const r=await axios.post("/${url}/password/passwordchecker",{username:params.username,oldpassword:val})

    console.log(r)

    if(r.data.data===true){
setpfield(true)
    }

}



async function Changepswrd(event){
    event.preventDefault()

   

var val1=document.getElementById("password").value
var val2=document.getElementById("confirmpassword").value

if(val1.length<5){
  setpswlength(true)
  return
}

if(val1===val2){
    const r=await axios.post("/${url}/password/changepassword",{email:params.email,password:val1})
    console.log(r)
    if(r.data.data===true){
        Logout()
    }
    
}

else{
    setnpfield(true)
}

}


function dropValueGetter(value){
  

 setskills(value)

 
}


async function Addskill(event){
  event.preventDefault()
  const token = localStorage.usertoken
  var decoded=jwt_decode(token)
  const r=await axios.post("/${url}/upload/addskill",{username:params.username,skills:skills})
 
if(r){
  setimgp(imgp+1)
}
 
}


function Unstate(event,a){
  event.preventDefault()
  if(a===1){
    document.getElementById("username").value=""
    userp?setuserp(false):setuserp(true)
  }
if(a===2){
  document.getElementById("phone").value=""
  ph?setph(false):setph(true)
}

if(a===3){
  document.getElementById("college").value=""
  clg?setclg(false):setclg(true)
}
if(a===4){
  document.getElementById("upi").value=""
  upi?setupi(false):setupi(true)
}
 if(a===5){
  
  sl?setsl(false):setsl(true)
 }

 if(a===6){
  sf?setsf(false):setsf(true)
 }

 if(a===7){
  sfr?setsfr(false):setsfr(true)
 }


}



function showskill(){
return(
  <div className="listdiv">
    {info.skills.map((each)=>{
      return (
      <p>{each.label}</p>
      )
    })}
  </div>
)

}





function Showpswchange(){
  pswstate?setpswstate(false):setpswstate(true)
}





return(
    <div className="container">
        
        <div className="mp">
        <div style={{display:"flex"}}>
        <img src={psrc} className="mainprofile"  alt="no-image"  />
        <div style={{display:"flexbox"}}>
        <input className="inpt f" type="file" accept="image/*" />
      {tkn!==null?decoded.data.username===params.username?<label for="file" className="lab" onClick={openwindow}><ImageSearchIcon /></label>:null:null}
{myw?<Imagewindow />:null}
</div>
</div>

<div className="progress">
        <div  style={{width:`${(info.answered.length/anslength)*100}%`,backgroundColor:"blue"}}></div>
        <div   style={{width:`${100-((info.answered.length/anslength)*100)}%`,backgroundColor:"white"}}></div>
        <p className="progress_para">{anslength-(info.answered.length)} questions to reach next level</p>
       </div>
      

       <div style={{display:"flex"}}> 
<div className="skilldiv">
<div style={{display:"flex"}}>
<h3 className="sklheader">Skills</h3>
{(decoded.data.username===params.username)?<button className="editbtn2" onClick={(event)=>Unstate(event,5)}><EditIcon style={{width:"28px",height:"28px"}} /></button>:null}
{sl?<MultiSelect
        className="drop_down1"
        options={skls}
        value={skills}
        onChange={(value)=>dropValueGetter(value)}
        labelledBy={"skills"}
        required={true}
      />:null}
         {sl?<button className="bt2" onClick={(event)=>Addskill(event)}><CheckCircleIcon /></button>:null}
         
</div>

    </div>  

  
        


</div> 

{info!=={}?showskill():null}
        
        </div>
        <div style={{marginLeft:"310px"}}>
        <label for="username" style={{fontSize:"25px"}}>Username:</label>
        {userp?<input className="inpt" id="username" type="text" onChange={(event)=>User(event)} placeholder="enter username" />:<input className="inpt" id="username" type="text"  value={params.username} readOnly={true} />}
        {userp?<button className="bt" onClick={(event)=>Change(event,1)}><CheckCircleIcon style={{width:"23px",height:"23px"}} /></button>:null}
       { (decoded.data.username===params.username)? <button className="editbtn" style={{left:"10px",bottom:"7px"}} onClick={(event)=>Unstate(event,1)}><EditIcon style={{width:"23px",height:"23px",color:"black"}}/></button>:null}
        {userp?para===true||para===undefined?<p className="userpara" style={{color:"#29bb89"}}>available</p>:<p className="userpara" style={{color:"red"}}>Already Exists</p>:null}
        </div>
       {(decoded.data.username===params.username)?
       <div>
        <label className="l" for="email" style={{fontSize:"25px",top:"45px",left:"360px"}}>Email:</label>
        <input className="inpt ip" id="email" type="email" placeholder="Email ID" value={decoded.data.email} readOnly={true} /></div>:null}
        {(decoded.data.username===params.username)?
        <div >
        <label className="l" for="phone" style={{fontSize:"25px",left:"255px",top:"45px"}}>Phone Number:</label>
        {ph?<input className="inpt ip" id="phone"  type="text" placeholder="Phone Number" />:<input className="inpt ip" id="phone"  type="text" value={info.phone} readOnly={true} />}
        {ph?<button className="bt" style={{left:"660px",bottom:"83px"}} onClick={(event)=>Change(event,2)}><CheckCircleIcon style={{width:"23px",height:"23px"}} /></button>:null}
       {(decoded.data.username===params.username)?<button className="editbtn" style={{left:"670px",bottom:"83px"}} onClick={(event)=>Unstate(event,2)} ><EditIcon style={{width:"23px",height:"23px",color:"black"}}/></button>:null}
        </div>:null}
        <div>
        <label className="l" for="college" style={{fontSize:"25px",left:"260px",top:"45px"}}>College Name:</label>
        {clg?<input className="inpt ip" id="college" type="text" placeholder="College Name"   />:<input className="inpt ip" id="college" type="text" value={info.college}  readOnly={true} />}
        {clg?<button className="bt" style={{left:"660px",bottom:"83px"}} onClick={(event)=>Change(event,3)}><CheckCircleIcon style={{width:"23px",height:"23px"}} /></button>:null}
        {(decoded.data.username===params.username)?<button className="editbtn" style={{left:"670px",bottom:"83px"}} onClick={(event)=>Unstate(event,3)}><EditIcon style={{width:"23px",height:"23px",color:"black"}}/></button>:null}
        </div>
        {(decoded.data.username===params.username)?
        <div>
        <label className="l" for="upi" style={{fontSize:"25px",left:"335px",top:"45px"}}>UPI_ID:</label>
        {upi?<input  className="inpt ip" type="text" id="upi" placeholder="Add your UPI ID" />:<input  className="inpt ip" type="text" id="upi" value={info.upi} readOnly={true} />}
        {upi?<button className="bt" style={{left:"660px",bottom:"83px"}} onClick={(event)=>Change(event,4)}><CheckCircleIcon style={{width:"23px",height:"23px"}} /></button>:null}
        <button className="editbtn" style={{left:"670px",bottom:"83px"}} onClick={(event)=>Unstate(event,4)}><EditIcon style={{width:"23px",height:"23px",color:"black"}}/></button>
        </div>
        :null}
     


{(decoded.data.username===params.username)?
<div>
<a className="pswbtn" href="#pswrddiv" onClick={(event)=>Showpswchange(event)}>Change Password</a>
   {pswstate?<form id="pswrddiv">
 
  <h3 className="pshead">Password Change</h3>
   {pfield===false?
   <div className="pswdiv">
        <label className="l" for="oldpassword">Current Password : </label>
        <input  className="pswinput" id="oldpassword" type="password" placeholder="Current Password" required={true}/>
        <button className="bt2" onClick={(event)=>Pswrdchecker(event)}><CheckCircleIcon style={{width:"23px",height:"23px"}}  /></button>
        </div>
   :null}
        
       { pfield?<div>
        <div className="pswdiv">
        <label className="l" style={{top:"7px"}} for="password">New Password : </label>
        <input  className="pswinput"  id="password" type="text" placeholder="New Password" required={true} />
        </div>
        <div className="pswdiv">
        <label className="l" style={{top:"7px"}}  for="confirmpassword">Confirm Password : </label>
        <input  className="pswinput"  id="confirmpassword"  type="text" placeholder="Confirm Password" required={true}/>
        </div>
        {pswlength?<p style={{marginLeft:"280px",marginTop:"20px",color:"red"}}>Password length should be greater than 5 characters</p>:null}
        {npfield?<p style={{color:"red"}}>These two password are same</p>:npfield===undefined?null:<p>These two password are NOT same</p>}
        <button className="bt3" onClick={(event)=>Changepswrd(event)}>Change</button>
        
        </div>:null}
  
        </form>:null}
       </div>
        :null}
       
    
       
     </div> 
     

    

)
}

export default Profile