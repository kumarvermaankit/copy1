import React, { useState,useEffect }  from 'react';

import "bootstrap/dist/css/bootstrap.min.css";

import Routes from "./components/Routes"

import { AppContext } from "./components/lib/contextlib";

import NavigationBar from './components/navbar';












function App() {


const [isAuthenticated, userHasAuthenticated] = useState(false);










useEffect(()=>{

  onLoad();
},[])


async function onLoad(){

  try{
    var access=localStorage.getItem("usertoken");
    if(access){
      userHasAuthenticated(true)
}

  }
  catch(event){
    if (event !== 'No current user') {
      console.log(event)
    }
  }

}


  return (
   
<div>

<AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
<NavigationBar />
  <Routes/>
</AppContext.Provider>
  
</div>










   


  )
}

export default App;
