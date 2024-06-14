/* eslint-disable react/jsx-key */
'use client'
import axios from "axios"
import "./items.css"
import { useEffect, useRef, useState } from "react"

export default function Item() {
  const [supplier , setSupplier] = useState<any>([])
  const [itemId , setItemID] = useState<any>([])
  const [itemName , setItemName] = useState<any>([])
  const [itemFactory , setItemFactory] = useState<any>([])
  const [itemSupplier , setItemSupplier] = useState<any>([])
  const [itemUnit , setItemUnit] = useState<any>([])

  const massageBox = useRef<any>([])
  const massage = useRef<any>([])

  function saveItem(e: { preventDefault: () => void }){
    e.preventDefault()
      axios.post('http://localhost:5000/admins/createitem' , {itemId , itemName , itemFactory ,itemSupplier ,itemUnit })
      .then(response=>{
        massage.current.innerText = response.data.msg
        massageBox.current.style.display = "none"
        if(massageBox.current.style.display == "none"){
          massageBox.current.style.display = "block"
          setTimeout(() => {
            massageBox.current.style.display = "none"
          }, 2500);
        }
      })
      .catch(err =>(console.log(err)))
  }

  useEffect(()=>{
    axios.get("http://localhost:5000/admins/supplier")
  .then(response=>{
    setSupplier(response.data)
  })
  .catch(err=>(console.log(err)))
  } , [supplier])
  
  return (
    <div>

    
    <form onSubmit={saveItem} action="" className="item-form" autoComplete="off">
      <h5 className="item-d-head">Item Definition</h5>
      <div className="itm-f-div">
          <label htmlFor="item-id">Item ID</label>
          <input type="text" id="item-id" required onChange={(e)=>{setItemID(e.target.value)}} />
      </div>
      <div className="itm-f-div">
          <label htmlFor="item-name">Item Name</label>
          <input type="text" id="item-name" required onChange={(e)=>{setItemName(e.target.value)}} />
      </div>
      <div className="itm-f-div">
          <label htmlFor="item-factoury">Item Factoury</label>
          <input type="text" id="item-factoury" required onChange={(e)=>{setItemFactory(e.target.value)}} />
      </div>
      <div className="itm-f-div">
          <label htmlFor="sup">Supplier</label>
          <input list="supplier" type="text" id="sup" required onChange={(e)=>{setItemSupplier(e.target.value)}} />
          <datalist id="supplier">
            {
                supplier.map((data: any)=>(
                  <option key={data.sup_id} value={data.sup_name}>{data.sup_name}</option>
                ))
            }
          </datalist>
      </div>
      <div className="itm-f-div">
          <label htmlFor="item-unit">Item Unit</label>
          <input type="text" list="unit" id="item-unit" required  onChange={(e)=>{setItemUnit(e.target.value)}}/>
          <datalist id="unit">
            <option value="Piece">Piece</option>
            <option value="Box">Box</option>
            <option value="Carton">Carton</option>
          </datalist>
      </div>
      <input className="inp-itm" type="submit" value="Add Item" />
    </form>
    <div className="msg" ref={massageBox}>
        <h5>System Notfication</h5>
        <p className="msgBox" ref={massage}></p>
      </div>
    </div>
  )
}