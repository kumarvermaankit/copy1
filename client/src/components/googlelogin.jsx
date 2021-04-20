import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom"
import GoogleLogin from 'react-google-login'
import axios from 'axios';
import { useAppContext } from "./lib/contextlib";


function Google(){

    
    const { userHasAuthenticated } = useAppContext(); 
    const history =useHistory();

const responsesuccessGoogle= (response)=>{

axios({
    method:"POST",
    url:"http://localhost:5000/googlelogin",
    data: {tokenId:response.tokenId}
}).then(res=>{
    console.log(res)
    if(res){
    localStorage.setItem('usertoken',res.data)
    userHasAuthenticated(true);
    history.push("/file")
}})
 .catch(err =>{
     console.log(err)
 })
}


useEffect(()=>{
document.getElementsByTagName("button")[3].style.backgroundColor="#00868B"
document.getElementsByTagName("g")[0].parentElement.parentElement.style.backgroundColor="#00868B"

},[])

const responsefailureGoogle=(response)=>{
    console.log(response);
}
return(
<div>
<GoogleLogin
    className="googlelogin"
    clientId="332494597752-f27u8a4kn43kv3v69j8891lcq5varrkl.apps.googleusercontent.com"
    buttonText="Google"
    onSuccess={responsesuccessGoogle}
    onFailure={responsefailureGoogle}
    cookiePolicy={'single_host_origin'}
  />
</div>
)
    
}

export default Google;