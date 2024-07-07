const mongoose = require('mongoose');

const otpSchema=new mongoose.Schema(
  {
      phoneNumber:{
          type:String,
          required:true

      },
      otp:{
          type:String,
          required:true
      },
      otpExpiration:{
          type:Date,
          default:Date.now,
          required:true,  
          get:(otpExpiration) => otpExpiration.getTime(),
          set:(otpExpiration) => new Date(otpExpiration),
      }

},
);
module.exports=mongoose.model("Mobile Otp",otpSchema);