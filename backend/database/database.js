import mysql from "mysql"

const databaseConnect = mysql.createConnection({
    host: "blreoo8niqn2jjskadlv-mysql.services.clever-cloud.com",
    user: "utxnktank6pwkllr", 
    password: "Ne8sl2S1zkpVceojXtmk",
    database: "blreoo8niqn2jjskadlv"
})

databaseConnect.connect((err)=>{
    if(err) throw err
    else{
        console.log("Database is ready to use")
    }
})

export default databaseConnect;