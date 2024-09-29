import express  from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/companyController.js";
import isAuthentic from "../middlewares/isAuthentic.js";
const router = express.Router();

router.route("/register").post(isAuthentic, registerCompany);
router.route("/getcompany").get(isAuthentic,getCompany);
router.route("/get/:id").get(isAuthentic,getCompanyById)
router.route("/update/:id").put(isAuthentic, updateCompany);

export default router
