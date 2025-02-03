import express from "express"
import { testcontroller } from "../Controler/testcontroller.js"
import authMidd from "../middle/authmiddleWare.js"


const userRouter = express.Router()



userRouter.post("/text-post",authMidd,testcontroller)

export default userRouter



