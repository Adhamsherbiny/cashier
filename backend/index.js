import express from "express";
import cors from "cors";
import userRoute from "./routes/userroute.js"

const port = 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use("/user" , userRoute)

app.listen(port , () => {console.log(`App is listenning port ${port} and server is running`)})