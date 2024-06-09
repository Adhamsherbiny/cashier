'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { faShopLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./homepage.css"
import axios from "axios";
export default function Home() {
  const router = useRouter()
  const [username , setUsername] = useState<any>()
  const [password , setPassword] = useState<any>()
  function login(e: any){
    e.preventDefault()
    axios.post("http://localhost:5000/admins/login" , {username , password})
    .then(function (response) {
      if(response.data.Login === true){
        router.push("/dashboard")
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
      <form className="login-form" action="" method="post" autoComplete="off" onSubmit={login}>
        <p className="form-head">Login</p>
        <div className="form-div">
          <label htmlFor="username" >Username</label>
          <input type="text" id="username" onChange={(e)=> setUsername(e.target.value)} />
        </div>
        <div className="form-div">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <input className="login-btn" type="submit" value="Login" />
      </form>
    </main>
  );
}
