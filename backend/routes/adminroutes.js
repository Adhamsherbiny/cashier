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
                    res.json({msg : "Added New User"})
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
                          res.status(200).json({msg:"Login Successfly", Login: true , user: userInfo[0].username});
                        } else{
                          res.status(200).json({msg:"Sorry wrong username or password" , Login: false});
                        }
                } )
            }
        }
    })
})

router.post("/createitem" , (req , res)=>{
    const values = [req.body.itemId , req.body.itemName , req.body.itemSupplier , req.body.piece  , req.body.pro , req.body.exp ]
    databaseConnect.query("SELECT * FROM item_definition WHERE item_id = (?)" , [req.body.itemId] , (err , result)=>{
        const findItem = [...result]
        if(findItem.length > 0 ){
            res.json({msg: 'Item is Already Exist'})
        }else{
            databaseConnect.query("INSERT INTO `item_definition` (item_id, item_name , item_supplier, Piece  , pro , exp) VALUES (?)" , [values] ,  (err , result)=>{
                if(err) throw err
                else{
                    res.json({msg: "Added New Item"})
                }
            })
        }
    })
    
})

router.post("/createsupplier" , (req , res)=>{
    const values = [req.body.supplierId , req.body.supplierName , req.body.supplierAddress]
    databaseConnect.query("SELECT * FROM supplier WHERE sup_id = (?)" , [req.body.supplierId] , (err , result)=>{
        const findSupplier = [...result]
        if(findSupplier.length > 0){
            res.json({msg: "Supplier is Already Exist"})
        }
        else{
            databaseConnect.query("INSERT INTO `supplier` (sup_id, sup_name, sup_adress) VALUES (?)" , [values] ,  (err , result)=>{
                if(err) throw err
                else{
                    res.json({msg: "Added New Supplier"})
                }
            })
        }
    })
    
})

router.post("/itemprice" , (req , res)=>{
    const values = [req.body.itemid , req.body.po , req.body.tax , req.body.margin , req.body.sale , req.body.unit , req.body.price]
    databaseConnect.query("SELECT * FROM item_price WHERE item_id = (?)" , [req.body.itemid] , (err , result)=>{
        const findPriceItem = [...result]
        if( findPriceItem.length > 0){
            res.json({msg: "This Item Has Price"})
        }else{
            databaseConnect.query("INSERT INTO `item_price` (item_id, po, tax , margin , sale , unit , price) VALUES (?)" , [values] ,  (err , result)=>{
                if(err) throw err
                else{ 
                    res.json({msg: "Added New Price"})
                }
            })
        }
    })
   
})

router.get("/allprice" , (req , res)=>{
    databaseConnect.query("SELECT * FROM item_price "  ,  (err , result)=>{
        if(err) throw err
        else{
            res.send(result)
        }
    })
})

router.post("/p" , (req , res)=>{
    databaseConnect.query("SELECT * FROM item_price WHERE item_id = ? "  , [req.body.id] , (err , result)=>{
        if(err) throw err
        else{
            res.json(result)
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

router.get("/items" , (req , res)=>{
    databaseConnect.query("SELECT * FROM item_definition" , (err, result)=>{
        if (err) throw err 
        else{
            res.send(result)
        }
    })
})

router.post("/i" , (req , res)=>{
    databaseConnect.query("SELECT * FROM item_definition WHERE item_id = (?)" , [req.body.id] , (err, result)=>{
        if (err) throw err 
        else{
            res.send(result)
        }
    })
})

router.post("/inventoryBuy" , (req , res)=>{
  const  values = [req.body.id , req.body.count , req.body.unit , req.body.nprice , req.body.total ] 
    databaseConnect.query("INSERT INTO inventory_buy (item_id , count , unit , price , total) VALUES (?)" , [values] , (err , result)=>{
        if (err) throw err

                res.json({msg: "Item Has Been Bought"})
    })
})

export {router as adminRouter}