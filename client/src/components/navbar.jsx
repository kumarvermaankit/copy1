import React, { useEffect, useState } from "react";
import {useHistory} from "react-router-dom";
import { useAppContext } from "./lib/contextlib";
import {Navbar,Nav} from "react-bootstrap"
import "./navbar.css"
import jwt_decode from "jwt-decode";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from "axios";
import MultiSelect from "react-multi-select-component";
import SearchIcon from '@material-ui/icons/Search';


function NavigationBar(){




  const [l,setl]=useState("")
  let history=useHistory();
const{isAuthenticated,userHasAuthenticated}=useAppContext();


var tkn=localStorage.getItem('usertoken');


if(tkn!==null){
  const token = localStorage.usertoken
  var decoded=jwt_decode(token)
}

const [file,setfile]=useState(null)
const [pstate,setpstate]=useState(false)

const [profile,setprofile]=useState(null)

const [myw,setmyw]=useState(false)

const [selected, setSelected] = useState({
  languages:[],
  fields:[],
  frameworks:[],
  string:""

});
const [passvalue,setpassvalue]=useState({
  larr:[],
  farr:[],
  frarr:[],
  s:""
})


const [psrc,setpsrc]=useState()
  async function Logout(event){

event.preventDefault();

await localStorage.removeItem('usertoken')
userHasAuthenticated(false);
 
history.push("/signin");
}



function imagecheck(s){
 for(var h=0;h<images.length;h++){
        if(s.data.filename==images[h].default.replace('/static/media/','').replace(/\.[^.]*(\.(jpg|jpeg|tiff|png|PNG|JPEG))/g, "$1")){
       setpsrc(images[h].default)
       return
          }
   }
          }


function Setprofile(event){

  setfile(event.target.files[0])
   
}


useEffect(()=>{


setl(window.location)

 
  

 
if(decoded){
  axios.get(`http://localhost:5000/profile/${decoded.data.username}`)
  .then((result)=>{
    imagecheck(result)
  })
  .catch((err)=>{
    console.log(err)
  })
}



},[window.location])





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


function openwindow(){
myw?setmyw(false):setmyw(true)
}


function dropValueGetter(value,a){
   
  if(a===1){
      var arr1=[]
      setSelected((prevvalue)=>{
          return{
              ...prevvalue,
              languages:value
          }
      })

      value.map((each)=>{
      arr1.push(each.value)
      })
   setpassvalue((prevvalue)=>{
       return{
           ...prevvalue,
           larr:arr1
       }
   })
 
  }
  else if(a===2){
      var arr1=[]
  
      setSelected((prevvalue)=>{
          return{
              ...prevvalue,
              fields:value
          }
      })
      value.map((each)=>{

arr1.push(each.value)
})
      setpassvalue((prevvalue)=>{
          return{
              ...prevvalue,
              farr:arr1
          }
      })
      
  }
  else if(a===3){
      var arr1=[]
      setSelected((prevvalue)=>{
          return{
              ...prevvalue,
              frameworks:value
          }
      })
      value.map((each)=>{
     arr1.push(each.value)
      })
      setpassvalue((prevvalue)=>{
          return{
              ...prevvalue,
              frarr:arr1
          }
      })
 
  }
  
  
if(passvalue.s===""){
  setpassvalue((prevvalue)=>{
      return{
          ...prevvalue,
          s:null
      }
  })
}

 
}


function Search(){
  var str1=""
  var str2=""
  var str3=""
  
  for(var i=0;i<passvalue.larr.length;i++){
      if(i===(passvalue.larr.length-1)){
          str1=str1+`${passvalue.larr[i]}`
      }
      else{
      str1=str1+`${passvalue.larr[i]}`+","
      }
  }
  for(var i=0;i<passvalue.farr.length;i++){
      if(i===(passvalue.farr.length-1)){
          str2=str2+`${passvalue.farr[i]}`
      }
      else{
      str2=str2+`${passvalue.farr[i]}`+","
      }
  }
  for(var i=0;i<passvalue.frarr.length;i++){
      if(i===(passvalue.frarr.length-1)){
          str3=str3+`${passvalue.frarr[i]}`
      }
      else{
      str3=str3+`${passvalue.frarr[i]}`+","
      }
  }

var val=document.getElementById("search").value
var t
if(passvalue.larr.length===0){
  str1=null
}
if(passvalue.farr.length===0){
  str2=null
}
if(passvalue.frarr.length===0){
  str3=null
}
if(val===""){
  t=null
}
else{
t=val
}

var s=`/search/${str1}/${str2}/${str3}/${t}`


  history.push(s)
 
}

 function sendimage(){

  const token = localStorage.usertoken
  var decoded=jwt_decode(token)
  

var data=new FormData();
data.append("file",file)

 axios.post("http://localhost:5000/profile",data)
 axios.post("http://localhost:5000/profile/upload",{email:decoded.data.email})




}

function Imagewindow(){

return(
  <div>
  <label  htmlFor="pro" className="custom-file-upload">Select</label>
    <input type="file" id="pro" onChange={(event)=>Setprofile(event)}/>
    {pstate?<p>{`One file Selected`}</p>:null}
    <button onClick={()=>sendimage()}>Upload</button>
  </div>
)

}

function importAll(r) {
  return r.keys().map(r);
}
  
const images = importAll(require.context("../profileimages", true, /\.(png|jpe?g|svg|PNG)$/));






  function AfterLoginNav(){


    return(
<div >
<Navbar  expand="lg" id="nav_bar" >

 

 <div className="dropdown">
  <button className="drop" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  <img src={psrc} className="profile"   alt="no-image" /><span className="profiletip">Profile</span>
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a className="dropdown-item" href={`/profile/${decoded.data.username}`}>Profile</a></li>
    <li><a className="dropdown-item" onClick={Logout} >Logout<ExitToAppIcon style={{height:"25px",width:"25px"}} /></a></li>
    <li><a className="dropdown-item" href={`/myq`}>My Questions</a></li>
  </ul>
</div>





  <Navbar.Brand className="cyducktitle" href="/home" ><h1><b>Cyduck</b></h1></Navbar.Brand>

   
<form className="frm" onSubmit={Search}>
        <input id="search" className="searchInput" placeholder="Search" />
        <button className="searchButton" type="submit"><SearchIcon /></button>
<MultiSelect
        className="drop_down lang"
        options={languages}
        value={selected.languages}
        onChange={(value)=>dropValueGetter(value,1)}
        labelledBy={"Select"}
      />
      <span className="langtip">languages</span>
<MultiSelect
        className="drop_down field"
        options={fields}
        value={selected.fields}
        onChange={(value)=>dropValueGetter(value,2)}
        labelledBy={"Select"}
      />
      <span className="fieldtip">fields</span>
      <MultiSelect
        className="drop_down fram"
        options={languages}
        value={selected.frameworks}
        onChange={(value)=>dropValueGetter(value,3)}
        labelledBy={"Select"}
      />
      <span className="framtip">framworks</span>
        </form>
      
        { ((l.toString().substr((l.toString().length-("/file").length),("/file").length))!="/file" && (l.toString().substr((l.toString().length-("/file").length),("/file").length))!="/home")?
    <a className="navitem" style={{left:"70px"}}  href="/file">Ask Question</a>
     :null}

  {l!="http://localhost:3000/community" && l!="http://localhost:3000/home"? <Nav.Link  href="/community" className="navlog" ><h3 className="navitem" style={{left:"20px"}}><b>Community</b></h3></Nav.Link>:null}
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
   
     
     
      
    </Nav>
    
  </Navbar.Collapse>
</Navbar>
</div>
)
    
  }


function BeforeLoginNav(){
  return(
    <div >
    <Navbar  expand="lg" id="nav_bar" >
    <Navbar.Brand className="cyducktitlebeforelog" href="/home" ><h1><b>Cyduck</b></h1></Navbar.Brand>

<form className="frm1" onSubmit={Search}>
        <input id="search" className="searchInput" placeholder="Search" />
        <button className="searchButton" type="submit"><SearchIcon /></button>
<MultiSelect
        className="drop_down lang"
        options={languages}
        value={selected.languages}
        onChange={(value)=>dropValueGetter(value,1)}
        labelledBy={"Select"}
      />
      <span className="langtip">languages</span>
<MultiSelect
        className="drop_down field"
        options={fields}
        value={selected.fields}
        onChange={(value)=>dropValueGetter(value,2)}
        labelledBy={"Select"}
      />
      <span className="fieldtip">fields</span>
      <MultiSelect
        className="drop_down fram"
        options={languages}
        value={selected.frameworks}
        onChange={(value)=>dropValueGetter(value,3)}
        labelledBy={"Select"}
      />
      <span className="framtip">framworks</span>
        </form>
      
      { ( (l.toString().substr((l.toString().length-("/signin").length),("/signin").length))!="/signin" &&  (l.toString().substr((l.toString().length-("/signup").length),("/signup").length))!="/signup" && (l.toString().substr((l.toString().length-("/home").length),("/home").length))!="/home" )?
   <div>
    <a  className="navitem " href="/signin">Signin</a>
    <a  className="navitem " href="signup">Signup</a>
    </div>
     :null }
    
   
       
      {(l.toString().substr((l.toString().length-("/community").length),("/community").length))!="/community" && l!="http://localhost:3000/home"? <Nav.Link  href="/community" className="navlog" ><h3 className="navitem" style={{left:"20px"}}><b>Community</b></h3></Nav.Link>:null}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
       
         
        
       
          
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
    </div>
  )
}


return(

  <div>
    {isAuthenticated ?<AfterLoginNav /> :<BeforeLoginNav />}
 
  </div>
)

}

export default NavigationBar