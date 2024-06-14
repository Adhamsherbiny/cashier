"use client"
import { useRef, useState } from "react"
import "./supplier.css"
import axios from "axios"
export default function Supplier() {
  const massageBox = useRef<any>([])
    const massage = useRef<any>([])
    const [supplierId , setSupplierId] = useState<any>([])
    const [supplierName , setSupplierName] = useState<any>([])
    const [supplierAddress , setSupplierAddress] = useState<any>([])
    function save(e: { preventDefault: () => void }){
        e.preventDefault()
        axios.post("http://localhost:5000/admins/createsupplier" , {supplierId , supplierName ,supplierAddress})
        .then(response =>{
          massage.current.innerText = response.data.msg
          massageBox.current.style.display = "none"
          if(massageBox.current.style.display == "none"){
            massage.current.innerText = response.data.msg
            massageBox.current.style.display = "block"
            setTimeout(() => {
              massageBox.current.style.display = "none"
            }, 2500);
          }
        })
        .catch(err =>{console.log(err)})
    }

    
  return (
    <div>
    <form onSubmit={save} action="" className="supplier" autoComplete="off">
      <h5 className="supplier-d-head">Supplier Definition</h5>
      <div className="supplier-div">
          <label htmlFor="supplier-id">Supplier ID</label>
          <input type="text" id="supplier-id" required onChange={(e)=>{setSupplierId(e.target.value)}}/>
      </div>
      <div className="supplier-div">
          <label htmlFor="supplier-name">Supplier Name</label>
          <input type="text" id="supplier-name" required onChange={(e)=>{setSupplierName(e.target.value)}} />
      </div>
      <div className="supplier-div">
          <label htmlFor="supplier-Address">Supplier Adress</label>
          <input type="text" id="supplier-Address" required onChange={(e)=>{setSupplierAddress(e.target.value)}} />
      </div>
      <input className="inp-sup" type="submit" value="Add Supplier" />
      </form>
      <div className="msg" ref={massageBox}>
        <h5>System Notfication</h5>
        <p className="msgBox" ref={massage}></p>
      </div>
    </div>
  )
}
