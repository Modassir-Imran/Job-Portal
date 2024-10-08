import { Application } from '../models/applicationModel.js'
import { Job } from '../models/jobModel.js'

export const applyJob = async (req, res) => {
  try {
    const userId = req.id
    const jobId = req.params.id
    if (!jobId) {
      return res.status(400).json({
        message: 'Job id is required',
        success: false
      })
    }
    // check if the user has already applied the job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId
    })

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job',
        success: false
      })
    }
    // check if the job exists
    const job = await Job.findById(jobId)
    if (!job) {
      return res.status(400).json({
        message: 'Job not found',
        success: false
      })
    }
    // create a new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId
    })

    // Ensure job.applications is an array
    if (!Array.isArray(job.applications)) {
      job.applications = []
    }

    job.applications.push(newApplication._id)
    await job.save()

    return res.status(201).json({
      message: 'Job applied successfully',
      success: true
    })
  } catch (error) {
    console.error('Error in applyJob:', error)
    return res.status(500).json({
      message: 'An error occurred while applying for the job',
      success: false
    })
  }
}

// export const applyJob = async (req, res) => {
//   try {
//     const userId = req.id
//     const jobId = req.params.id
//     if (!jobId) {
//       return res.status(400).json({
//         message: 'Job id is required',
//         success: false
//       })
//     }
//     // check if the user has already applied the job
//     const existingApplication = await Application.findOne({
//       job: jobId,
//       applicant: userId
//     })

//     if(existingApplication){
//         return res.status(400).json({
//             message : "You have already applied for this job",
//             success: false
//         })
//     }
//     // check if the jobs exists
//     const job  = await Job.findById(jobId)
//     if (!job){
//         return res.status(400).json({
//             message:"Job not found",
//             success : false
//         });
//     }
//     // create a new application
//     const newApplication = await Application.create({
//         job:jobId,
//         applicant: userId,

//     });
//     if (!job.applications) {
//         job.applications = [];
//       }

//       job.applications.push(newApplication._id);
//     await job.save();
//     return res.status(201).json({
//         message:"Job applied successfully",
//         success:true
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id
    const appliaction = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: 'job',
        options: { sort: { createdAt: -1 } },
        populate: {
          path: 'company',
          options: { sort: { createdAt: -1 } }
        }
      })
    if (!appliaction) {
      return res.status(404).json({
        message: 'No Application',
        success: false
      })
    }

    return res.status(200).json({
      appliaction,
      success: true
    })
  } catch (error) {
    console.log(error)
  }
}

// how many user applied job seeing by admin
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id

    const job = await Job.findById(jobId).populate({
      path: 'applications',
      options: { sort: { createdAt: -1 } },
      populate: {
        path: 'applicant'
      }
    })
    if (!job) {
      return res.status(404).json({
        message: 'Job not found',
        success: false
      })
    }

    return res.status(200).json({
      job,
      success: true
    })
  } catch (error) {}
}

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body
    const applicationId = req.params.id
    if (!status) {
      return res.status(400).json({
        message: 'status is required',
        success: false
      })
    }
    const application = await Application.findOne({ _id: applicationId })
    if (!application) {
      return res.status(404).json({
        message: 'Application not found',
        success: false
      })
    }
    application.status = status.toLowerCase()
    await application.save()

    return res.status(200).json({
      message: 'Status updated successfully',
      success: true
    })
  } catch (error) {
    console.log(error)
  }
}
