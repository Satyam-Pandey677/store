import express from "express";
import { connectDB } from "./config/db.js";
import path from "path";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const port = process.env.PORT
connectDB()

import userRouter from "./routes/user.router.js"

app.use("/store/v1/api",userRouter)

app.listen(port, () => {
    console.log("Server running at Port : ",port)
})