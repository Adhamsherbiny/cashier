/* eslint-disable react/jsx-key */
'use client'
import axios from "axios"
import "./items.css"
import {Key, useEffect, useState } from "react"

export default function Item() {
  const [supplier , setSupplier] = useState<any>([])
  const [itemId , setItemID] = useState<any>([])
  const [itemName , setItemName] = useState<any>([])
  const [itemFactory , setItemFactory] = useState<any>([])
  const [itemSupplier , setItemSupplier] = useState<any>([])
  const [itemUnit , setItemUnit] = useState<any>([])

  function saveItem(e: { preventDefault: () => void }){
      axios.post('http://localhost:5000/admins/createitem' , {itemId , itemName , itemFactory ,itemSupplier ,itemUnit })
      .then(response=>(console.log(response.data)))
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
    <form onSubmit={saveItem} action="" className="item-form" autoComplete="off">
      <h5 className="item-d-head">Item Definition</h5>
      <div className="itm-f-div">
          <label htmlFor="item-id">Item ID</label>
          <input type="text" id="item-id" onChange={(e)=>{setItemID(e.target.value)}} />
      </div>
      <div className="itm-f-div">
          <label htmlFor="item-name">Item Name</label>
          <input type="text" id="item-name" onChange={(e)=>{setItemName(e.target.value)}} />
      </div>
      <div className="itm-f-div">
          <label htmlFor="item-factoury">Item Factoury</label>
          <input type="text" id="item-factoury" onChange={(e)=>{setItemFactory(e.target.value)}} />
      </div>
      <div className="itm-f-div">
          <label htmlFor="sup">Supplier</label>
          <input list="supplier" type="text" id="sup" onChange={(e)=>{setItemSupplier(e.target.value)}} />
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
          <input type="text" list="unit" id="item-unit"  onChange={(e)=>{setItemUnit(e.target.value)}}/>
          <datalist id="unit">
            <option value="Piece">Piece</option>
            <option value="Box">Box</option>
            <option value="Carton">Carton</option>
          </datalist>
      </div>
      <input className="inp-itm" type="submit" value="Add Item" />
    </form>
  )
}