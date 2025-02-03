import mongoose from "mongoose";




const jobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true , "comapanay name is required"]
    },
    position:{
        type:String,
        required:[true,"Job podition is required"],
        maxlength:100
    },
    status:{
        type:String,
        enum:["pending","reject","interview"],
        default:"pending"
    },

    worktype:{
        
        type:String,
        enum:["part-time","full-time","internship","contract"],
    default:'full-time',




},
workLocation:{
    type:String,
    default:"mumbai",
    required:[true,"work location is required"]

}    ,
createBy:{
    type:mongoose.Types.ObjectId,
    ref:"User"
}


},{timestamps:true})

const job = mongoose.model("job",jobSchema)

export default job;