import mongoose from "mongoose";
import bcyrpt from "bcryptjs"
import JWT from "jsonwebtoken";
import dotenv from "dotenv"



const createuser = new mongoose.Schema({

name:{
    type:String,
    required:[true,"Name is Required"]
},
age:{
    type:Number,
    
},
password:{
type:String,
required:true
},
email:{
type:String,
required:true,
unique:true,

},
location:{
    type:String,
    required:[true,"Location is required"]
}
},{timestamps:true})


createuser.pre("save",async function (){
if(!this.isModified) return
    const Salt = await bcyrpt.genSalt(10)


    this.password =await bcyrpt.hash(this.password,Salt)
})



createuser.methods.create_JWT = function(){

    return JWT.sign({userId:this._id},process.env.Secrete_KEY,{expiresIn:"1d"})

}

//login function

createuser.methods.comparepassword = async function(isPassword){

    const isMatch = await bcyrpt.compare(isPassword,this.password)

    return isMatch


}






const user = mongoose.model("User",createuser)




export default user