import express from "express";
import { SignUpUser, LoginUser, GetMyProfile } from "../controller/UserController.js";
import { isAuthenticate } from "../config/isAuth.js";
import  {upload} from '../controller/UserController.js';
const router = express.Router();

router.post("/signUp", upload.single("image"), SignUpUser);

router.post("/login", LoginUser);
router.get("/getprofile",isAuthenticate, GetMyProfile);


export default router;
