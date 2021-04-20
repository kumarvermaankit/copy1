import Community from "./community"
import jwt_decode from "jwt-decode";
import { useEffect,useState } from "react";
import axios from "axios";
function MyQuestions(){
    const token=localStorage.usertoken;
    var decoded=jwt_decode(token)
  
   





    
 
    return(
        <div>
        
        <Community url={`http://localhost:5000/upload/myquestions`} url1={`http://localhost:5000/upload/mq/${decoded.data.username}`} />
        </div>
    )
}

export default MyQuestions;