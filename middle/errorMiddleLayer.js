export const errorHandler=(err,req,res,next)=>{
    console.log(err)
    res.status(500).send({
        message:"somthing went wrong",
        success:false,
        err
    })
}