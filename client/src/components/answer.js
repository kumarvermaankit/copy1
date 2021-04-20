import React from "react";
import "./code.css";
import { useParams } from "react-router-dom";
import CodeM from "./cm"

function Answer(props){
    let params=useParams();
    
    return (
        <div>
        
          <CodeM val={params.des} read={params.state} hght="60px" wdt="1000"/>
          <CodeM val={params.ans} read={params.state} hght="400px" wdt="1000"/>
          
          
            
        </div>
    )
}

export default Answer;