import express from "express";
import cors from "cors";
import { adminRouter } from "./routes/adminroutes.js";

const port = 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use('/admins', adminRouter)

app.listen(port , () => {console.log(`App is listenning port ${port} and server is running`)})