import express from "express"
import dotenv from "dotenv"
//library
import cors from "cors"
import morgan from "morgan"
import userRouter from "./routes/userpost.js"
import handleconnection from "./Modal/connection.js"
import authRouter from "./routes/authrout.js"
import {errorHandler} from "./middle/errorMiddleLayer.js"
import updateRouter from "./routes/testroutes.js"
import { jobrouter } from "./routes/jobsroute.js"
import helmet from "helmet"
import mongoSanitize from "express-mongo-sanitize"
import swaggerJSDoc from "swagger-jsdoc"
import swaggerUI from "swagger-ui-express"
import cookieParser from "cookie-parser"

const app = express()
dotenv.config()

const PORT = process.env.PORT || 8001
handleconnection(process.env.MONGO_URL)


//middle layer
app.use(cors())
app.use(morgan("dev"))
app.use(helmet())
app.use(mongoSanitize())
app.use(express.json())
app.use(cookieParser())

const options ={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"job portal application",
            description:'Node js express js job portal Application'
        },
        servers:[
            {
                url:"http://localhost:8001",
                url:"https://job-portal-vsl5.onrender.com"

            }
        ]
    },
    apis:["./routes/*.js"]
}

const spec = swaggerJSDoc(options)



app.use("/user/test",userRouter)
app.use("/user",authRouter)
app.use("/user",updateRouter)
app.use("/jobs",jobrouter)



app.use("/user-api",swaggerUI.serve,swaggerUI.setup(spec))

///error-handling middleware
app.use(errorHandler)




app.listen(PORT,()=>console.log("server start at",PORT))
