import express from "express";
import { addpayments, getDashboard } from "../controller/PayymentController.js";

const router = express.Router();

router.post("/addpayment", addpayments);

router.get("/dashboard", getDashboard);

export default router;
