

var mongoose=require("mongoose");
var encrypt=require("mongoose-encryption");


// var encKey = process.env.SOME_32BYTE_BASE64_STRING;
// var sigKey = process.env.SOME_64BYTE_BASE64_STRING;

var Schema=mongoose.Schema;

var UserPschema= new Schema({

email:{
    type:String,
    required:true,
    minlength:3,
    unique:true
},
username:{
    type:String,
    required:true,
    minlength:3

},
password:{
    type:String,
    required:true,
    minlength:4
},
profile:{
 type:Object,
 default:null   
},

questions:[{
 
    question_id:{
        type:"String"
    },
    index_no:{
        type:"Number",
        default:0
    },
    docname:{
        type:"String",
        
    }
 
        
    
    }]
    ,
   answered:[{

    docname:{
        type:"String",
        
    },
        question_index:{
            type:"String"
        },
       answerindex:{
            type:"Number",
       
        },
        index:{
            type:"Number",
            default:0
        },
        id:{
            type:"String"
        }
    }],

    phone_number:{
        type:"String",
        default:"Not Entered"
    },
    college:{
        type:"String",
        default:"Not Entered"
    },
skills:[],
    
upi_id:{
        type:"String",
       default:"Not Entered"
    }
      
  


})
const secret=process.env.MYSECRET;
UserPschema.plugin(encrypt, {  secret:secret,excludeFromEncryption:['username','email','questions','profile','answered',"phone_number","college","skills","upi_id"] });

const UserProfile=mongoose.model('UserProfile',UserPschema)

module.exports=UserProfile;



 