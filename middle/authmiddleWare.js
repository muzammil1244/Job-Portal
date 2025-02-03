

import JWT from "jsonwebtoken";
import dotenv from "dotenv"

const authMidd = (req,res,next)=>{

    const istoken = req.cookies.token

    console.log(istoken)

    if(!istoken ){

next("Token is necessary")

    }







    try{

        const payload = JWT.verify(istoken,process.env.Secrete_KEY)

        req.user = {userId:payload.userId}

        if(!payload){
next("token is not match")

        }

next()

    }catch(err){

    next(err)


    }

    
}

export default authMidd;