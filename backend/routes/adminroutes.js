import cors from "cors"
import express, { Router, json } from "express"
import databaseConnect from "../database/database.js"
import bcrypt from "bcrypt"
const router = express.Router()
router.use(express.json())
router.use(cors())



router.post('/adduser' , async (req , res)=>{
    const values = [req.body.username , await bcrypt.hash(req.body.password,10)  , req.body.per];
    databaseConnect.query('SELECT * FROM users Where username = (?)' , [req.body.username] , (err , result)=>{
        const findUser = [...result]
        if(findUser.length > 0){
            res.json( {msg :"Sorry this User is Already Exist"})
        }else{
            databaseConnect.query('INSERT INTO users (username , password , permissions) VALUES (?)' , [values],  (err , result)=>{
                if (err) throw err
                else{
                    res.json({msg : "added New User"})
                }
            })
        }
    })    
})

router.post("/login" , (req , res)=>{
    databaseConnect.query('SELECT * FROM users Where username = (?)' , [req.body.username] , (err , result)=>{
        const userInfo = [...result]
        if (err) throw err
        else{
            if (userInfo.length <= 0){  
                res.status(200).json({msg : "Can not find username or wrong password"})
            } else{
                 bcrypt.compare(req.body.password, userInfo[0].password , (err , re)=>{
                        if (err) throw err
                        if (re){
                          res.status(200).json({msg:"Login Successfly", Login: true});
                        } else{
                          res.status(200).json({msg:"Sorry wrong username or password" , Login: false});
                        }
                } )
            }
        }
    })
})

router.post("/createitem" , (req , res)=>{
    const values = [req.body.itemId , req.body.itemName , req.body.itemFactory , req.body.itemSupplier , req.body.itemUnit]
    databaseConnect.query("INSERT INTO `item_definition` (item_id, item_name, item_factoury, item_supplier, item_unit) VALUES (?)" , [values] ,  (err , result)=>{
        if(err) throw err
        else{
            res.json({result , msg: "Added New Item"})
        }
    })
})

router.post("/createsupplier" , (req , res)=>{
    const values = [req.body.supplierId , req.body.supplierName , req.body.supplierAddress]
    databaseConnect.query("INSERT INTO `supplier` (sup_id, sup_name, sup_adress) VALUES (?)" , [values] ,  (err , result)=>{
        if(err) throw err
        else{
            res.json({result , msg: "Added New Supplier"})
        }
    })
})

router.get("/supplier" , (req , res)=>{
    databaseConnect.query("SELECT * FROM supplier" , (err , result)=>{
        if(err) throw err
        else{
            res.send(result)
        }
    })
})

export {router as adminRouter}