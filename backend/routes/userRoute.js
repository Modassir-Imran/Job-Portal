import express  from "express";
import { login, logOut, register, updateProfile } from "../controllers/userController.js";
import isAuthentic from "../middlewares/isAuthentic.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logOut)
router.route("/profile/update").post(isAuthentic,  updateProfile);

export default router
