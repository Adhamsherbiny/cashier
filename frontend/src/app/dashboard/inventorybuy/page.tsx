"use client";
import { useEffect, useRef, useState } from "react";
import "./inventorybuy.css";
import axios from "axios";
import { error } from "console";
export default function InventoryBuy() {
  const massageBox = useRef<any>([]);
  const massage = useRef<any>([]);
  const [items, setItems] = useState<any>([]);
  const [id, setId] = useState<string>('');
  const [price, setPrice] = useState<any>([]);
  const [unit, setUnit] = useState<any>([]);
  const [nprice, setNPrice] = useState<any>([]);
  const [carton, setCarton] = useState<any>([]);
  const [total, setTotal] = useState<any>([]);
  const [count, setCount] = useState<any>([]);

  function buy(e: { preventDefault: () => void }){
    e.preventDefault()
    axios.post("http://localhost:5000/admins/inventoryBuy" , { id , count , unit , nprice , total})
    .then((response)=>{
     massage.current.innerText =  response.data.msg
     if(true){
      if(response.data.msg == "Item Has Been Bought"){
        massageBox.current.style.backgroundColor = "green" 
      }
      massageBox.current.style.display = "block"
      setTimeout(() => {
          massageBox.current.style.display = "none"
      }, 1500);
     }
    })
    .catch(error => console.log(error))
  }

  useEffect(()=>{
    axios.post("http://localhost:5000/admins/p" , {id})
    .then(response => {
      setNPrice(response.data[0]['po'])
      setUnit(response.data[0]['unit'])
    })
    .catch(err=>console.log(err))
  } , [id])

  useEffect(()=>{
    axios.post("http://localhost:5000/admins/i" , {id})
    .then(response => {
      setCarton(response.data[0]["Piece"])
    })
    .catch(err=>console.log(err))
  } , [id])

  useEffect(()=>{
    axios
    .get("http://localhost:5000/admins/items")
    .then((response) => {
      setItems(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
    axios.get("http://localhost:5000/admins/allprice")
    .then((response) => {
      setPrice(response.data);
      setTotal(Number(count) * Number(nprice))
    })
    .catch((err) => {
      console.log(err);
    });

  }, [items , count  , nprice])

  return (
    <div className="price-page">
      <form className="price-form" onSubmit={buy} autoComplete="off">
        <h5 className="price-head">Inventory Buy</h5>
        <div className="price-d">
          <label htmlFor="item-id">Item ID</label>
          <input list="itemId" type="text" id="item-id" required  onChange={(e)=>{setId(e.target.value)}}/>
          <datalist id="itemId">
            {
            
            items.map((data: any) => (
              <option key={data.item_id} value={data.item_id}>
                {data.item_name}
              </option>
            ))}
          </datalist>
        </div>
        <div className="price-d">
          <label htmlFor="count-piece">Count of Piece</label>
          <input type="number" id="count-piece" required onChange={(e)=>{setCount(e.target.value)}} />
        </div>
        <div className="price-d">
          <label htmlFor="pinc">Piece in Carton</label>
          <input type="text" id="pinc" disabled value={carton} />
        </div>
        <div className="price-d">
          <label htmlFor="unit">Unit</label>
          <input type="text" id="unit" disabled value={unit} />
        </div>
       <div className="price-d">
          <label htmlFor="price" >Price</label>
          <input type="text" id="price"  disabled value={nprice} />
        </div>
        <div className="price-d">
          <label htmlFor="total">Total</label>
          <input type="number" id="total" disabled value={total} />
        </div>

        <input className="inp-itm-p" type="submit" value="Buy" />
      </form>
      <div className="msg" ref={massageBox}>
        <h5>System Notfication</h5>
        <p className="msgBox" ref={massage}></p>
      </div>
    </div>
  );
}
