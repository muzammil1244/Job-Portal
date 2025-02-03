import job from "../Modal/jobs.js"
import mongoose from "mongoose"
import moment from "moment"

export const addjobs = async (req, res, next) => {
    console.log("yseeeee")
    const { company, position } = req.body

    if (!company || !position) {

        next("please provid all data")

    }

    req.body.createBy = req.user.userId

    try {
        const data = await job.create(req.body)

        res.json({ data })

    } catch (err) {
        console.log(err);

    }


}


export const get_job = async (req, res) => {

    const { status, workType, search, sort } = req.query

    let qyueryStatus = {
        createBy: req.user.userId
    }

    if (status && status !== 'all') {
        qyueryStatus.status = status

    }

    if (workType && workType !== 'all') {

        qyueryStatus.workType = workType

    }

    if (search) {

        qyueryStatus.position = { $regex: search, $options: 'i' }
    }

    let data = job.find(qyueryStatus)

    if (sort == "latest") {
        data = data.sort("-createdAt")
    }
    if (sort == "oldest") {
        data = data.sort("createdAt")
    }
    if (sort == "a-z") {
        data = data.sort("position")
    }
    if (sort == "A-Z") {
        data = data.sort("-position")
    }

    //pagination

    const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 10
const skip = (page - 1) * limit

data = data.skip(skip).limit(limit)

const totaleJob = await job.countDocuments(data)

const numOfPages = Math.ceil(totaleJob / limit)


    const jobs = await data

    res.status(200).json({ jobs, numOfPages, numOfPagesLength: numOfPages.length })

}



export const updatjobs = async (req, res, next) => {

    const { id } = req.params

    const { company, position } = req.body

    console.log(company, position)
    if (!company || !position) {

        next(" please provided all data")

    }

    const jobs = await job.findOne({ _id: id })
    if (!jobs) {

        next("job is not found")

    }

    if (!req.user.userId === jobs.createBy.toString()) {
        return next("you are not authorized")

    }

    const updateJob = await job.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({ updateJob })


}

export const DeleteJob = async (req, res, next) => {

    const { id } = req.params

    const jobs = await job.findOne({ _id: id })

    if (!jobs) {

        return next("job is not found")

    }



    if (!req.user.userId === jobs.createBy.toString()) {
        return next("you are not authorized")

    }

    await jobs.deleteOne();

    res.status(200).json({ message: "job is deleted" })

}


export const job_groups = async (req, res) => {
    const id = req.user.userId

    console.log(id)


    try {
        const status = await job.aggregate([
            {
                $match: {
                    createBy: new mongoose.Types.ObjectId(id),
                },
            },
            {
                $group: {
                    _id: `$status`,
                    count: { $sum: 1 }
                }
            }
        ]);

        const defaultStatus = {

            pending: status.pending || 0,
            reject: status.reject || 0,
            interview: status.interview || 0

        }

        let monthlyApplication = await job.aggregate([
            {
                $match: {
                    createBy: new mongoose.Types.ObjectId(id)
                }
            }, {

                $group: {

                    _id: {
                        year: { $year: `$createdAt` },
                        month: { $month: `$createdAt` }

                    },
                    count: {
                        $sum: 1
                    }

                }

            }

        ])

        monthlyApplication = monthlyApplication.map(item => {
            const { _id: { year, month }, count } = item

            const data = moment().month(month - 1).year(year).format(`MMM Y`)

            return { data, count }
        }).reverse()

        // Agar aggregation successful hai, to data ko response mein bhejenge
        res.status(200).json({ totalJob: status.length, defaultStatus, monthlyApplication }); // 200 OK response ke saath data bhejna
    } catch (error) {
        // Agar koi error aaye to usse handle karna
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }


}