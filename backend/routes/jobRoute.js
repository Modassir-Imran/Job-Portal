import express  from "express";
import {postJob, getAllJobs, getJobById , getAdminJobs } from "../controllers/jobController.js";
import isAuthentic from "../middlewares/isAuthentic.js";
const router = express.Router();

router.route("/postjobs").post(isAuthentic, postJob);
router.route("/getjobs").get(isAuthentic, getAllJobs);
router.route("/get/:id").get(isAuthentic, getJobById);
router.route("/getadminjobs").get(isAuthentic,getAdminJobs );


export default router
