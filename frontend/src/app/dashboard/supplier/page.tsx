"use client"
import { useState } from "react"
import "./supplier.css"
import axios from "axios"
export default function Supplier() {
    const [supplierId , setSupplierId] = useState<any>([])
    const [supplierName , setSupplierName] = useState<any>([])
    const [supplierAddress , setSupplierAddress] = useState<any>([])
    function save(){
        axios.post("http://localhost:5000/admins/createsupplier" , {supplierId , supplierName ,supplierAddress})
        .then(response =>{console.log(response)})
        .catch(err =>{console.log(err)})
    }
  return (
    <div>
    <form onSubmit={save} action="" className="supplier" autoComplete="off">
      <h5 className="supplier-d-head">Supplier Definition</h5>
      <div className="supplier-div">
          <label htmlFor="supplier-id">Supplier ID</label>
          <input type="text" id="supplier-id" onChange={(e)=>{setSupplierId(e.target.value)}}/>
      </div>
      <div className="supplier-div">
          <label htmlFor="supplier-name">Supplier Name</label>
          <input type="text" id="supplier-name" onChange={(e)=>{setSupplierName(e.target.value)}} />
      </div>
      <div className="supplier-div">
          <label htmlFor="supplier-Address">Supplier Adress</label>
          <input type="text" id="supplier-Address" onChange={(e)=>{setSupplierAddress(e.target.value)}} />
      </div>
      <input className="inp-sup" type="submit" value="Add Supplier" />
      </form>
    </div>
  )
}
