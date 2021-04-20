import Community from "./community"
import { useParams } from "react-router-dom";
import {
    BrowserRouter as Router,
    Link,
    useLocation
  } from "react-router-dom";

function Search(){

  

    let params=useParams();
   var lstr=params.languages;
   lstr=lstr.split(",")
   for(var i=0;i<lstr.length;i++){
       if(lstr[i]==="C  "){
           lstr[i]="C++"
       }
   }
    var fstr=params.fields;
    fstr=fstr.split(",")

    var frstr=params.frameworks;
    frstr=frstr.split(",")

    
    

    return(
    <Community url={`http://localhost:5000/upload/search/${fstr}/${lstr}/${frstr}/${params.string}`}/>
    )
}

export default Search