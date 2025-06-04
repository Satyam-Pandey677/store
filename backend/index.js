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

app.get("/",(req, res) => {
    res.send("hello world")
})

app.listen(port, () => {
    console.log("Server running at Port : ",port)
})