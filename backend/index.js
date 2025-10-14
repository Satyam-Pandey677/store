import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const port = process.env.PORT
connectDB()

import userRouter from "./routes/user.router.js"
import categoryRouter from "./routes/category.router.js"
import productRouter from "./routes/product.router.js"
import uploadRouter from "./routes/upload.router.js"
import orderRouter from "./routes/order.routes.js"
app.use("/api/user",userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/products",productRouter)
app.use("/api/upload", uploadRouter)
app.use("/api/order", orderRouter)



app.get("/api/config/paypal", (req, res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID});
})

const __dirname = path.resolve()
console.log(__dirname)
// app.use('/uploads', express.static(path.join(__dirname + '/uploads')))

app.listen(port, () => {
    console.log("Server running at Port : ",port)
})
