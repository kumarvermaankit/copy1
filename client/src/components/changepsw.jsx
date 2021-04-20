import React from "react";
import { useState } from "react";
import "./changepassword.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
import {Link,useHistory} from "react-router-dom";
import { useAppContext } from "./lib/contextlib";


function Change(){

    const token = localStorage.usertoken
    const decoded=jwt_decode(token)
    let history=useHistory();
    const{isAuthenticated,userHasAuthenticated}=useAppContext();


    const[passwords,setpasswords]=useState({
        oldpassword:"",
        newpassword:"",
        confirmpassword:""
    })

    function PswChange(event){
     const {name,value}=event.target;

    setpasswords((prevvalue)=>{
           return{
               ...prevvalue,
               [name]:value
           }
    })

    }

  function  Sendpassword(){
      if(passwords.newpassword===passwords.confirmpassword){
        axios.post(`/changepassword/${decoded.data.email}`,passwords)
        .then((res)=>{
            if(res===true){
                localStorage.removeItem('usertoken')
userHasAuthenticated(false);
 
history.push("/signin");
            }
            
        })
      }
  
  }

    return(
        <div>
            <form>
                <input className="psw" type="password" name="oldpassword" value={passwords.oldpassword} onChange={PswChange} placeholder="Old-Password"/>
                <input className="psw" type="password" name="newpassword" value={passwords.newpassword} onChange={PswChange} placeholder="New-Password"/>
                <input className="psw" type="password" name="confirmpassword" value={passwords.confirmpassword} onChange={PswChange} placeholder="Confirm-Password"/>
                <button type="submit" onClick={Sendpassword}>Submit</button>
            </form>
        </div>
    )
}

export default Change;