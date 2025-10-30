import mongoose from "mongoose";
const UserScheme = new mongoose.Schema({
    image :{
        type : String,
        required:true
    },
    name :{
        type : String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
})
const UserModel = mongoose.model("UserData" , UserScheme)
export default UserModel