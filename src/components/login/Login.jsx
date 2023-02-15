import React, { useState } from 'react'
import './Login.css'
import { Link,useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate=useNavigate();
    const[credentials,setCredentials]=useState({email:"",password:""})

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
      }

    const handleSubmit=async (e)=>{
        e.preventDefault(); 
        
        console.log("ruko dekhteh haiemail password sahi ai")
        const response = await fetch('https://frejun-backends.onrender.com/api/auths/login', {
            method: 'POST',
            headers: {
    
    
                'Content-Type': 'application/json',
    
    
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json=await response.json();
        // console.log(json.exist._id);
        // const p=json.exist._id

        // const name=json.exist.name;
        
        // localStorage.setItem("user_id2",p)
     
        // localStorage.setItem("user_name",name)
        // setExist(localStorage.getItem("user_id2"));
      
        if(json.success){
        //   await activeuser(p);
          navigate("/home")
        } 
        else{
            alert("invalid credentials")
        }
    }
  return (
    <div className='center'>
     <h1>login</h1>
     <form method="POST">

        <div className="txt_field">
            <input type="text" name="email" onChange={onChange} value={credentials.name} required/>
       
            <label >email</label>
        </div>
        <div className="txt_field">
            <input type="password" onChange={onChange} name="password" value={credentials.password}required/>
       
            <label >password</label>
        </div>
        <input type="submit" onClick={handleSubmit} value="login" />
        <div className="signup_link">not a member?  
          <Link to="/">Signup</Link>
        </div>

     </form>
    </div>
      
  )
}
