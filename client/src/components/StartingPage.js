import React from "react";
import "./home.css"
import {useHistory} from "react-router-dom";

import cyduck from "./cyduck.png"

function StartingPage(){


  var tkn=localStorage.getItem('usertoken');
console.log(tkn)
  let history=useHistory();


  function gotofile(event){
    event.preventDefault()

    history.push("/file")
  }

function gotosign(event){
  event.preventDefault()
  history.push("/signin")
}

    return(
        <div  className="homediv" >
        
        <div className="box">
        <div className="boxbar">
        


        </div>
        <div className="list">
         <ul>
          <li><a href="/home">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="/community">Community</a></li>
          <li><a href="#Contact">Contact </a></li>
                    
                

         </ul>
        </div>
        <div className="heading"><h1>CYDUCK</h1></div>
        <div className="writer">
            <h2>We ensure easy clarifications</h2>
            <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum laboriosam sunt cupiditatesit amet consectetur adipisicing elit. Harum laboriosam sunt cupiditatesit amet consectetur adipisicing elit. Harum laboriosam sunt cupiditate </h4>
            <form action=""  method="get">
            {tkn===null?<a className="strlinks" href="/signin"  >Get Started</a>:null}
           {tkn!==null?<a  className="strlinks" style={{paddingLeft:"45px"}} href="/community">Answer a Question</a>:<a  className="strlinks2" href="/community">Answer a Question</a>}
            
            </form>
            
            <a  className="strlinks try" href="/file" >Ask Question</a> 
        </div>
        
    </div>
    <div className="about-us">
        
        <h2>What do we do?</h2>
        <div className="about-content">
            <img   src={cyduck} alt="" />
        <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique vitae, consequuntur nisi odit nihil debitis animi sit quisquam ut perspiciatis deleniti unde itaque, eveniet fuga quam doloribus, dignissimos molestiae amet.<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ea quasi ipsam minima eligendi sunt et nemo eaque autem nobis fugit vitae,?</p></h4>
        
        </div>
       
                    
    </div>
    <div className="payment">
        <h2>Payment Scheme</h2>
      <p>Willingness to quench curoisity</p> 
        <div className="paymentcontain">

        <div className="payment-box">
               <div className="icon"><i className="fa fa-inr" aria-hidden="true"></i></div>
                <div className="content">
                    <h3>Free</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    
                </div>

                
            </div>
            <div className="payment-box">
               <div className="icon"><i className="fa fa-inr" aria-hidden="true"></i></div>
                <div className="content">
                    <h3> 3 /6hr</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                    
                </div>

                
            </div>
            <div className="payment-box">
                
                <div className="content">
                    <h3> 5 /3hr</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                    
                </div>
            </div>
            <div className="payment-box">
               
                <div className="content">
                    <h3> 10 /1hr</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. </p>
                    
                </div>
            </div>
        </div>
        
    </div>



    <section id="Contact">
        <div className="footer">
            <div className="footer-basic">
                <footer>
                    <div className="social">
                        <a href="#"><i className="icon ion-social-instagram"></i></a>
                        <a href="#"><i className="icon ion-social-youtube-outline"></i></a>
                        <a href="#"><i className="icon ion-social-twitter"></i></a>
                        <a href="#"><i className="icon ion-social-facebook"></i></a>
                    </div>
    
                    <ul className="list-inline">
                        <li className="list-inline-item"><a href="#">Get in Touch</a></li>
                        
                        
                    </ul>
                    <p className="copyright">Company Name © 2021</p>
                </footer>
            </div>
            
        
         </div>
        
    </section>
        </div>
    )
}



export default StartingPage