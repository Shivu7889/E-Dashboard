import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
const Signup = ()=>{
    const [name , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const Navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            Navigate('/');
        }
    })



    const collectData = async ()=>{
        console.log(name,email,password);
        let result = await fetch("http://localhost:5000/register",{
            method:"POST",
            body:JSON.stringify({name,email,password}),
            headers:{
                "Content-Type":"application/json"
                },
        });
        result =await result.json();
        console.log(result);
       Navigate('/');
       localStorage.setItem('user',JSON.stringify(result.result)); 
       localStorage.setItem('token',JSON.stringify(result.auth)); 

    }
    return(
        <div className='register'>
            <h1>Regiter YourSelf</h1>
            <input className='inputBox' type='text'
            value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Name'></input>

            <input className='inputBox' type='text'
            value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Email'></input>

            <input className='inputBox' type='password'
            value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Password'></input>

            <button onClick={collectData} className ='appButton' type='button'>Sign Up</button>
        </div>
)
}

export default Signup;