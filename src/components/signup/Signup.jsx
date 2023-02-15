import React, { useState } from 'react'
import './Signup.css'
import { Link,useNavigate } from 'react-router-dom'
export default function Signup() {


    const navigate=useNavigate()
    const[credentials,setCredentials]=useState({name:"",email:"",password:""})

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }
  
    const handleSubmit=async (e)=>{
      e.preventDefault();
      console.log("ruko dekhteh haiemail password sahi ai")
      const response = await fetch('http://localhost:8000/api/auths/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
  
      });
      const json=await response.json();
      console.log(json);
      if(json.success){
        navigate("/login")
      }  
      else{
        alert("user already exist")
      }
  
  }
  

  return (
    <div className='center'>
     <h1>Signup</h1>
     <form method="POST">

        <div className="txt_field">
            <input type="text" name="name" value={credentials.name} onChange={onChange} required/>
       
            <label >name</label>
        </div>
        <div className="txt_field">
            <input type="email" name="email" value={credentials.email} onChange={onChange} required/>
       
            <label >email</label>
        </div>
        <div className="txt_field">
            <input type="password" name="password" value={credentials.password} onChange={onChange} required/>
       
            <label >password</label>
        </div>
        {/* <div className="pass">forgot password?</div> */}
        <input type="submit" onClick={handleSubmit} value="Signup" />
        <div className="signup_link">already a member?  
          <Link to="/login">Login</Link>
        </div>

     </form>
    </div>
      
  )
}
