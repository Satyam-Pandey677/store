import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const port = process.env.PORT
connectDB()

import userRouter from "./routes/user.router.js"
import categoryRouter from "./routes/category.router.js"

app.use("/api/user",userRouter)
app.use("/api/category", categoryRouter)

app.listen(port, () => {
    console.log("Server running at Port : ",port)
})