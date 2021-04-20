const express = require("express");
const cors = require("cors");
const app = express();
const Razorpay=require("razorpay");
const shortid = require("shortid");
const router=express.Router();
app.use(cors());

const request=require("request")

const keys=require("./keys");

const razorinstance=new Razorpay({
  key_id:keys.razorIdkey,
  key_secret:keys.razorIdSecret

})

router.get("/order/:money",(req,res)=>{
  try{
    const options={
      amount:(req.params.money)*100,
      currency:"INR",
      receipt:"receipt_#1",
      payment_capture:0,
    }
    razorinstance.orders.create(options,async (err,order)=>{
      if(err){
        return res.status(500).json({
          message:'Somethings Wrong'
        })
      }
      else{
        return res.status(200).json(order)
      }
    })
  }
  catch(error){
    return res.status(500).json({
      message:'Somethings Error'
    })
  }
})

router.post("/capture/:paymentId/:money",(req,res)=>{
  try{
    return request(
      {
        method : "POST",
        url : `https://${keys.razorIdkey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form:{
          amount :  (req.params.money)*100,
          currency: "INR"
        },
      },
      async function(err,response,body){
        if(err){
          return res.status(500).json({
            message: "Something error!s"
          })
        }
        return res.status(200).json(body)
      }
    )
  }
  catch(err){
    return res.status(500).json({
      message: err.message
    })
  }
})






module.exports=router;