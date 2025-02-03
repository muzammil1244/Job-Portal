import express from "express";
import { addjobs, DeleteJob, job_groups } from "../Controler/jobpost.js";
import { get_job } from "../Controler/jobpost.js";
import authMidd from "../middle/authmiddleWare.js";
import { updatjobs } from "../Controler/jobpost.js";

export const jobrouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Jobs
 *     description: Operations related to job postings
 */

/**
 * @swagger
 * /jobs/post-jobs:
 *   post:
 *     summary: Create a new job posting
 *     tags: [Jobs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *                 description: The name of the company
 *               position:
 *                 type: string
 *                 description: The position being offered
 *               
 *     responses:
 *       201:
 *         description: Job created successfully
 *       400:
 *         description: Bad request, invalid data
 *       401:
 *         description: Unauthorized, invalid token
 */
jobrouter.post("/post-jobs", authMidd, addjobs);

/**
 * @swagger
 * /jobs/get-job:
 *   get:
 *     summary: Get all job postings
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A list of job postings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized, invalid token
 */
jobrouter.get("/get-job", authMidd, get_job);

/**
 * @swagger
 * /jobs/update/{id}:
 *   patch:
 *     summary: Update a job posting
 *     tags: [Jobs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The job ID to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company:
 *                 type: string
 *               position:
 *                 type: string
 *              
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Bad request, invalid data
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized, invalid token
 */
jobrouter.patch("/update/:id", authMidd, updatjobs);

/**
 * @swagger
 * /jobs/delete-job/{id}:
 *   delete:
 *     summary: Delete a job posting
 *     tags: [Jobs]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The job ID to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       404:
 *         description: Job not found
 *       401:
 *         description: Unauthorized, invalid token
 */
jobrouter.delete("/delete-job/:id", authMidd, DeleteJob);

/**
 * @swagger
 * /jobs/job-status:
 *   get:
 *     summary: Get job status summary (pending, interview, reject)
 *     tags: [Jobs]
 *     responses:
 *       200:
 *         description: A summary of job statuses
 *       401:
 *         description: Unauthorized, invalid token
 */
jobrouter.get("/job-status", authMidd, job_groups);

export default jobrouter;
