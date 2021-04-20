import React, { useEffect, useState } from "react";

import { useHistory } from "react-router-dom"

import { useAppContext } from "../lib/contextlib";

import "bootstrap/dist/css/bootstrap.min.css";

import login from "../UserFunctions";
import "../styles/Signin.scss"
import Google from "../googlelogin";

import cyduck from "../cyduck.png";


import axios from "axios"





function SignIn(props){

    const [signpara,setsignpara]=useState(false);
    const { userHasAuthenticated } = useAppContext();  
    const [emails,setemails]=useState([])
    const [emailstate,setemailstate]=useState()
const [userP,setUserP]=useState({
email:"",

password:"",
});


const history =useHistory();




useEffect(()=>{
    axios.get("http://localhost:5000/signin/availableinfo")
    .then((result)=>{
        
        setemails(result.data.data)
    })
    },[])



function OnChange(event,a){

event.preventDefault()

if(a===1){
    if(emails.includes(event.target.value)===true){
        setemailstate(true)
    }
    else{
        setemailstate(false)
    }
}

const {name,value}=event.target;

return( 

setUserP(prevValue=>{

return{
...prevValue,
[name]:value

}
})    
)
}



function OnSubmit(event){

   event.preventDefault();


if(emailstate===true){
    login(userP).then(res=>{
        if(res){
   userHasAuthenticated(true);
   history.push("/file")
    }
    else{
        setsignpara(true);
    }
      })
   
.catch(err=>console.log(err));
}

  


}












return(

<div >

<div className="login-container" id="divsign">
    
   
    {/* <Facebook /> */}

    
    <form onSubmit={OnSubmit} >

    <p class="header" ><b>LOG IN !</b></p>
  <div >
  <label ><h3 ><b>Email</b></h3></label>
    <input id="inputelement1" className="signinput" type="email" name="email" value={userP.email} onChange={(event)=>OnChange(event,1)} onFocus={()=>setemailstate(false)} required="true"  />
    {emailstate===true?<p className="checkpara1" >Alright</p>:emailstate===false?<p className="checkpara" >Email doesn't exist</p>:null}
  </div>
 
  <div >
  <label className="inputlabel"><h3 ><b>Password</b></h3></label>
      <input id="inputelement2" className="signinput" type="password" name="password" value={userP.password} onChange={(event)=>OnChange(event,0)} required="true" autoComplete="off"/>
  </div>
  <div>
      {signpara?<p>Your Credentials are wrong</p>:null}
  </div>
  <div >
      <button className=" signinput" id="signbutton" type="submit" classname="btn btn-primary"><h3><b>LOGIN</b></h3></button>
  </div>
    </form>
<div>

<div className="line">
<p className="or">OR</p>
</div>


</div></div>
<div className="otherlogin">
<img  className="cyduck_in" src={cyduck} alt="" />
<a id="signupoption"  href="/signup"><h2>SignUp</h2></a>
 <Google />     
</div>
</div>
)
}


export default SignIn