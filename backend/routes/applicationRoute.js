import express  from "express";
import isAuthentic from "../middlewares/isAuthentic.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/applicationController.js";
const router = express.Router();

router.route('/apply/:id').get(isAuthentic, applyJob)
router.route('/get').get(isAuthentic, getAppliedJobs)
router.route('/:id/applicants').get(isAuthentic, getApplicants)
router.route('/status/:id/update').post(isAuthentic, updateStatus)




export default router
