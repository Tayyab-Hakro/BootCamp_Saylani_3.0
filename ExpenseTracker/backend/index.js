import express from "express";
import dotenv from 'dotenv';
import connectDB from './config/Connectdb.js';
import UserRoute from './routes/UserRoute.js';
import PaymentsRoute from "./routes/PaymentsRoute.js"
import cors from "cors"
dotenv.config()
const app = express();
app.use(express.json())
app.use("/uploads", express.static("uploads"));
;

app.use(cors())
connectDB()
const port = 3000;

app.use("/api/user" , UserRoute)
app.use("/api/payments" ,PaymentsRoute)

app.listen(port, () => {
  console.log(`Using port ${port}`);
});
