import router from "./routes/adminroutes.js"
import databaseConnect from "../database/database.js"
import express from "express";
import cors from "cors";
const port = 5000
const app = express()
app.use(express.json())
app.use( "/admins" , router  )
app.use(cors({
    origin:"*",
    methods: ["POST" , "GET"],
    Credential:true
}
))
app.get("/" , (req , res)=>{
    res.send("Api is running")
})


app.listen(port , () => {console.log(`App is listenning port ${port} and server is running`)})