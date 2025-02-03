import user from "../Modal/user.js"



export const updateuser = async(req,res,next)=>{

    const {name,email,password,location,age} = req.body
    console.log(name,email)

    if(!name || !email ||!password || !location || !age){

        return next("please provied all details")
    }
try{
    
    const data = await user.findOne({_id:req.user.userId})

    if(data){

        console.log("user :",data)
    }

data.name = name
data.email = email
data.password = password
data.location = location
data.age = age

await data.save()

const token = data.create_JWT()


res.send({

    data,token

})

}catch(err){
    return next(err)
}






}