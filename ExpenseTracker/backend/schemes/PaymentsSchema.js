import mongoose from "mongoose";
const PaymentScheme = new mongoose.Schema({
    
    description :{
        type : String,
        required: true
    },
    amount :{
        type:String,
        required:true
    },
    balance :{
        type:String,
       enum: ["income", "expense"], 
    }, 
    Date :{
        type:Date,
         date: { type: Date, default: Date.now }
    }
})
const PaymentModel = mongoose.model("UserPayments" , PaymentScheme)
export default PaymentModel