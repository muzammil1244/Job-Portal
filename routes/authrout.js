import express from "express"
import { authController, handlelogin } from "../Controler/authController.js";
import  {rateLimit}  from 'express-rate-limit'


const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

const authRouter = express.Router()

 /**
  * @swagger
  * components:
  *   schemas:
  *     User:
  *       type: object
  *       required:
  *         - name
  *         - age
  *         - password
  *         - email
  *         - location
  *       properties:
  *         id:
  *           type: string
  *           description: The auto-generated id of the user collection
  *         name:
  *           type: string
  *           description: User name
  *         email:
  *           type: string
  *         password:
  *           type: string
  *           description: User password
  *         location:
  *           type: string
  *           description: User location
  *         age:
  *           type: number
  *           description: User age
  *       example:
  *         name: "XYZ Khan"
  *         email: "xyz@gmail.com"
  *         password: "123456"
  *         location: "MARS"
  *         age: 19
  */


 /**
  * @swagger
  * tags:
  *   name: Auth
  *   description:  Authentication Apis
  * 
  */
   /**
    * @swagger
    * /user/register:
    *   post:
    *     summary: Register a new user
    *     tags: [Auth]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             $ref: '#/components/schemas/User'
    *     responses:
    *       200:
    *         description: User created successfully
    *         content:
    *           application/json:
    *             schema:
    *               $ref: '#/components/schemas/User'
    *       500:
    *         description: Internal server error
    */ 

   /**
    * @swagger
    * /user/login:
    *   post:
    *     summary: Login a user
    *     tags: [Auth]
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               email:
    *                 type: string
    *                 description: User email
    *               password:
    *                 type: string
    *                 description: User password
    *     responses:
    *       200:
    *         description: User logged in successfully
    *         content:
    *           application/json:
    *             schema:
    *               type: object
    *               properties:
    *                 token:
    *                   type: string
    *                   description: Authentication token
    *       401:
    *         description: Invalid credentials
    *       500:
    *         description: Internal server error
    */



//register routes
authRouter.post("/register",limiter,authController)

//login routes

authRouter.post("/login",limiter,handlelogin)



export default authRouter;