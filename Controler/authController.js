import user from "../Modal/user.js"
import jwt from "jsonwebtoken"
export const authController = async (req, res, next) => {

    const { name, age, email, password, location } = req.body

    if (!name) {
        next("name is required")
    }
    if (!email) {
        next("email is required")
    }
    if (!password) {
        next("password is required")
    }

    const existData = await user.findOne({ email })

    if (existData) {
        return res.end("user is alrady exist")
    }


    try {

        const data = await user.create({
            name: name,
            email: email,
            password: password,
            location: location,
            age: age
        })


        console.log("data add sucessfully")

        const token = data.create_JWT()
        

        
        res.send({
            message:"user create sucessfuly",
            data,
        token })

    } catch (err) {
        next(err)
    }



}

export const handlelogin = async(req,res,next )=>{

    const {email,password} = req.body

    console.log("password",password)

    if(!email || !password){

      next("please provied all data")

    }

    const veryemail = await user.findOne({email})

    if(!veryemail){

       return next("email is not found")
    }


    const isMatch = await veryemail.comparepassword(password)

if(!isMatch){

next("password is not match")

}

veryemail.password = undefined

const token = await veryemail.create_JWT()

res.cookie("token",token)


 return res.json({

    succses :true,
    message:"user is finded",
    veryemail,
    token

})




}


