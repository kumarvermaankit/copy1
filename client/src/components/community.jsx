import React, { useEffect, useState} from "react"
import axios from "axios";
import "./community.css";
import {Card}from 'react-bootstrap'

import one from "./images/one.jpg" ;
import five from "./images/five.jpg" ;

import Pagination from "react-js-pagination";
import  {useHistory } from 'react-router-dom'







function Community(props){
  

   
 
let history=useHistory();


if(history.location.state!==undefined) {
    if((history.location.state.from)==="/file" || (history.location.state.from)==="/qcode" ){
        history.push("/community",{state:"nothing"})
        window.location.reload()
    }
}
     const [CD,setCD]=useState(true)
    const [rp,setrp]=useState(0)
    
 
    const [activepage,setactivepage]=useState(1)

     const[no_of_questions,setno_of_questions]=useState(0);


   
    var tkn=localStorage.getItem('usertoken');

  
 

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





const [arr,setarr]=useState([]);

var str="";


async function handlePageChange(pageNumber) {
    setactivepage(pageNumber)
    
    
   const r= await axios.post("http://localhost:5000/upload/activepage",{pageNumber:pageNumber})
   if(r){
    window.location.reload();
   }

   }





useEffect(()=>{

 
    
    startTimer()



  
    

 
setarr([])
  

  async function Helper(){
    const result=await axios.get(`${props.url1}`)

  


 if(result){
    const res= await axios.get(`${props.url}`);
    if(res.data.arr.length===0){
        window.location.reload()
    }


       setarr(res.data.arr)
       setactivepage(res.data.pagenumber)
       setno_of_questions(res.data.no_of_questions)
 }


}


async function NonHelper(){
    const res= await axios.get(`${props.url}`);
    setarr(res.data.arr)
     setactivepage(res.data.pagenumber)
     setno_of_questions(res.data.no_of_questions)
}
  
if((window.location)=="http://localhost:3000/myq"){
Helper()
}
else{
    
NonHelper()
}






},[rp])


async function Support(){
     
setarr([])
  

async function Helper(){
  const result=await axios.get(`${props.url1}`)


  for(var i=0;i<result.data.questions.length;i++){
      if(i===(result.data.questions.length-1)){
          str=str+`${result.data.questions[i].index_no}`+`docname${result.data.questions[i].docname}`
      
      }
      else{
      str=str+`${result.data.questions[i].index_no}`+`docname${result.data.questions[i].docname}`+","
      

  } 
    }
  

const res= await axios.get(`${props.url}${str}`);
if(res.data.arr.length===0){
   window.location.reload()
}
  setarr(res.data.arr)
  setactivepage(res.data.pagenumber)
  setno_of_questions(res.data.no_of_questions)

}


async function NonHelper(){
  const res= await axios.get(`${props.url}`);
  setarr(res.data.arr)
   setactivepage(res.data.pagenumber)
   setno_of_questions(res.data.no_of_questions)
}

if((window.location)=="http://localhost:3000/myq"){
Helper()
}
else{
  
NonHelper()
}
}     



var timeoutInMiliseconds = 120000;
var timeoutId; 
 
function startTimer() { 
   
    timeoutId = window.setTimeout(doInactive, timeoutInMiliseconds)
    
}
 
function doInactive() {
   setrp(rp+1)
}








function Countdown(props){
  
    


    const [checker,setchecker]=useState(false)  
    var time=Date.parse(props.time)
    var currenttime=Date.parse(new Date())
    
    const [secondspassed,setsp]=useState((((currenttime-time)/(1000))-17940))
    
    
    useEffect(()=>{
       
    
    
        if(props.d!=="extra"){
            setTimeout(()=>{
                setsp(secondspassed+1)
              
        
                },1000)
        }
      
    
          
     
    
    async function extra(){
        if(Number(Math.abs(Math.floor(secondspassed/(60*60)) % 24))){
            const r=await axios.post("http://localhost:5000/upload/autodelete",{document:props.d,index:props.idx})
            if(r){
                axios.post("http://localhost:5000/upload/autoupdate")
                window.location.reload()
            setCD(false)
            }
            
        }
    
    }
      if(props.d!=="extra" && secondspassed>=3600){
        extra()
      }
    
         
    },[secondspassed])
    
    
    
  
        
       
        return (
            <div className="community_timer">
              


    {checker || props.d==="extra"?<p>TimeUp!</p>:<ul className="CD">
    
    
    
    <li className="timer" >{Math.abs((Math.floor(secondspassed/(60*60)) % 24))<10?"0"+Number(Math.abs(Math.floor(secondspassed/(60*60)) % 24)):Number(Math.abs(Math.floor(secondspassed/(60*60)) % 24))}</li>
    <li className="timer">{Math.abs(Math.floor(secondspassed/60) % 60)<10?"0"+Math.abs(Math.floor(secondspassed/60) % 60):Math.abs(Math.floor(secondspassed/60) % 60)}</li>
    <li className="timer">{Math.abs(secondspassed % 60)<10?"0"+Number(Math.abs(secondspassed % 60)):Math.abs(secondspassed % 60)}</li>

                 </ul>}
            </div>
        ) 
       
    
    
    
    }
    
    



function Quesdiv(props){

    

return(

    
    <div id={props.i} className="main" key={props.i}   >

  <Card className="headercard"  >
       
  <Card.Link href={`/ques/${props.index}/${props.doc_name}/${props.u}`}  ><p style={{color:"black",fontSize:"20px"}}><b>{props.t}</b></p><Card.Text className="username1" style={{color:"black"}}>~{props.u}</Card.Text></Card.Link>

 
 {CD?<Countdown  time={props.time} d={props.doc_name} idx={props.index} />:<p>0</p>}
 


</Card>
{(props.doc_name==="bronze")?<img  class="card_img1" src={one}/>:(props.doc_name==="silver")?<img class="card_img1" src={five}/>:(props.doc_name==="gold")?<img  class="card_img1" src={five}/>:(props.doc_name==="extra")?<img  class="card_img1"  src={null}/>:null}

 </div>
)
}








  
const Items=()=>{




    return(
    <div style={{display:"block"}}> 
   
     
    {arr.map((each)=>{
        if(each===null || each.info===null){
         return <h1>NO Searches Found</h1>
     }


        
     
    

     return <Quesdiv key={each.info.id} t={each.info.question_title} c={each.info.question_content} v={each.info.votes} a={each.info.answer} i={each.info.id} u={each.info.username} s={each.info.imginfo} paymentvalue={each.info.value.amount} comments={each.info.comments} doc_name={each.info.documentname} index={each.index} time={each.info.time}/>
     
    
        
    })}
    
 
    </div>
    )
    }






return(
  
    <div>
   

    <div className="contain">


   




  

<Items />


<Pagination
className="pages"
          activePage={activepage}
          itemsCountPerPage={2}
          totalItemsCount={5*(no_of_questions)}
          pageRangeDisplayed={5}
          onChange={(pagenumber)=>handlePageChange(pagenumber)}
        />
 
    </div>


</div>
)

}

export default Community;