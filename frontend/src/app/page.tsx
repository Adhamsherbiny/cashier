'use client'
import { useRef, useState } from "react";
import { useRouter } from 'next/navigation'
import { faShopLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./homepage.css"
import axios from "axios";
export default function Home() {
  const router = useRouter()
  const massageBox = useRef<any>([])
  const massage = useRef<any>([])
  const [username , setUsername] = useState<any>([])
  const [password , setPassword] = useState<any>([])
  function login(e: any){
    e.preventDefault()
    axios.post("http://localhost:5000/admins/login" , {username , password})
    .then(function (response) {
      massage.current.innerText = response.data.msg
      if(true){
        massageBox.current.style.display = "block"
        setTimeout(() => {
          massageBox.current.style.display = "none";   
        }, 1000);
        if(response.data.msg == "Login Successfly"){
          massageBox.current.style.backgroundColor = "green"
        }else{
          massageBox.current.style.backgroundColor = "red"
        }
      }
        if(response.data.Login === true){
        localStorage.setItem("user" , response.data.user)
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500);
      }
    }).catch(function (error) {
      console.log(error);
    });

  }
  return (
    <main>
      <header className="header-logo">
        <FontAwesomeIcon className="logo" icon={faShopLock}/>
        <h2 className="logo-text">Market Cashier System</h2>
      </header>
      <form className="login-form" method="post" autoComplete="off" onSubmit={login}>
        <p className="form-head">Login</p>
        <div className="form-div">
          <label htmlFor="username" >Username</label>
          <input type="text" id="username" required onChange={(e)=> setUsername(e.target.value)} />
        </div>
        <div className="form-div">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <input className="login-btn" type="submit" value="Login" />
      </form>
      <div className="msg" ref={massageBox}>
        <h5>System Notfication</h5>
        <p className="msgBox" ref={massage}></p>
      </div>
    </main>
  );
}
