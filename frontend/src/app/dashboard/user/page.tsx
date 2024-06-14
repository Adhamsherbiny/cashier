'use client'
import { useRef, useState } from "react"
import "./user.css"
import axios from "axios"
export default function User() {
  const massageBox = useRef<any>([])
  const massage = useRef<any>([])
  const [username , setUsername] = useState<any>([])
  const [ password, setPassword] = useState<any>([])
  const [ per , setPer] = useState<any>([])
  
  function createUser(e: { preventDefault: () => void }){
    e.preventDefault()
    axios.post("http://localhost:5000/admins/adduser" , {username ,  password , per})
    .then(response=>{
      massage.current.innerText = response.data.msg
          if(massageBox.current.style.display == "none"){
            massageBox.current.style.display = "block"
            setTimeout(() => {
              massageBox.current.style.display = "none"
            }, 2500);
          }
    })
    .catch(err => (console.log(err)))

  }
  return (
    <div>
    <form onSubmit={createUser} className="user-definition" autoComplete="off">
      <h5 className="user-d-head">Users Definition</h5>
      <div className="user-div">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required onChange={(e)=>{setUsername(e.target.value)}}/>
      </div>
      <div className="user-div">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required onChange={(e)=>{setPassword(e.target.value)}}  />
      </div>
      <div className="user-div">
          <label htmlFor="permissions">Permissions</label>
          <input type="text" id="permissions" required onChange={(e)=>{setPer(e.target.value)}}  />
      </div>
      <input className="inp-user" type="submit" value="Add User" />
      </form>
      <div className="msg" ref={massageBox}>
        <h5>System Notfication</h5>
        <p className="msgBox" ref={massage}></p>
      </div>
    </div>
  )
}

