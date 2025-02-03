import express from "express"
import authMidd from "../middle/authmiddleWare.js";
import { updateuser } from "../Controler/updateuser.js";



const updateRouter = express.Router()


updateRouter.put("/update",authMidd,updateuser)

export default updateRouter;