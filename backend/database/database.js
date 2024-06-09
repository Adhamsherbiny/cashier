import mysql from "mysql"

const databaseConnect = mysql.createConnection({
    host: "127.0.0.1",
    user: "root", 
    password: "",
    database: "cashierco"
})

databaseConnect.connect((err)=>{
    if(err) throw err
    else{
        console.log("Database is ready to use")
    }
})

export default databaseConnect;