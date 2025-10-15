import express from "express";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors"
import { fileURLToPath } from "url";

const app = express()
app.use(cors({
    origin:["http://localhost:5173","https://store-1-y4sw.onrender.com"],
    credentials:true
}))
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

//this section for
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});


app.listen(port, () => {
    console.log("Server running at Port : ",port)
})
