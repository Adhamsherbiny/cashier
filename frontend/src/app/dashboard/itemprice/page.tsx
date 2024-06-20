"use client";
import axios from "axios";
import "./itemprice.css";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

export default function Price() {
	const massageBox = useRef<any>([]);
	const massage = useRef<any>([]);
	const [items , setItems] = useState<any>([])
	const [itemid , setItemID] = useState<any>([])
	const [po , setPo] = useState<any>([])
	const [tax , setTax] = useState<any>([])
	const [margin , setMargin] = useState<any>([])
	const [sale , setSale] = useState<any>([])
	const [unit , setUnit] = useState<any>([])
	const [price , setPrice] = useState<any>([])
	useEffect(()=>{
		setPrice((Number(po) * Number(tax)) + (Number(po) + Number(margin)) - Number(sale));
	} , [po , tax , margin , sale])
	
	function savePrice(e: { preventDefault: () => void; }){
		e.preventDefault()
		axios.post("http://localhost:5000/admins/itemprice" , {itemid , po , tax  , margin , sale , unit , price})
		.then(response =>{
			massage.current.innerText = response.data.msg
			massageBox.current.style.display = "none"
			if(massageBox.current.style.display == "none"){
			  if(response.data.msg == "This Item Has Price"){
				massageBox.current.style.backgroundColor = "red"
			  }else{
				massageBox.current.style.backgroundColor = "green"
			  }
			  massage.current.innerText = response.data.msg
			  massageBox.current.style.display = "block"
			  setTimeout(() => {
				massageBox.current.style.display = "none"
			  }, 2500);
			}
		  })
		.catch(err=>(console.log(err)))
	}

	axios.get("http://localhost:5000/admins/items")
	.then(response =>{
		setItems(response.data)
	})
	.catch(err =>{
		console.log(err)
	})

	return (
		<div className="price-page">
			<form onSubmit={savePrice} className="price-form" autoComplete="off">
				<h5 className="price-head">Price Definition</h5>
				<div className="price-d">
					<label htmlFor="item-id">Item ID</label>
					<input list="itemId" type="text" id="item-id" required onChange={(e)=>{setItemID(e.target.value)}} />
					<datalist id="itemId">
					{
								items.map((data: any)=>(
									<option key={data.item_id} value={data.item_id}>{data.item_name}</option>
								))
						}
					</datalist>
				</div>
				<div className="price-d">
					<label htmlFor="po">PO</label>
					<input type="text" id="po" required onChange={(e)=>{setPo(e.target.value)}} />
				</div>
				<div className="price-d">
					<label htmlFor="tax">Tax</label>
					<input type="text" id="tax" required onChange={(e)=>{setTax(e.target.value)}} />
				</div>
				<div className="price-d">
					<label htmlFor="margin">Margin</label>
					<input type="text" id="margin" required onChange={(e)=>{setMargin(e.target.value)}} />
				</div>
				<div className="price-d">
					<label htmlFor="sale">Sale</label>
					<input type="text" id="sale" required onChange={(e)=>{setSale(e.target.value)}} />
				</div>
				<div className="price-d">
					<label htmlFor="unit">Unit</label>
					<input type="text" list="units" id="unit" required onChange={(e)=>{setUnit(e.target.value)}} />
					<datalist id="units">
						<option value="Piece">Piece</option>
						<option value="Box">Box</option>
						<option value="Carton">Carton</option>
					</datalist>
				</div>
				<div className="price-d">
					<label htmlFor="price">Price</label>
					<input type="text" id="price" disabled value={price} />
				</div>
				<input className="inp-itm-p" type="submit" value="Add Price" />
			</form>
			<div className="msg" ref={massageBox}>
				<h5>System Notfication</h5>
				<p className="msgBox" ref={massage}></p>
			</div>
		</div>
	);
}
