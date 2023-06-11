import React ,{useState ,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Login =()=>{
    const [password , setPassword] = useState("");
    const [email , setEmail] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const handleLogin =async ()=>{
        let result = await fetch("http://localhost:5000/login",{
            method:"POST",
            body:JSON.stringify({email,password}),
            headers:{
                "Content-Type":"application/json"
                },
            });
            result = await result.json();
       
            if(result.auth){
               localStorage.setItem("user",JSON.stringify(result.user));
               localStorage.setItem("token",JSON.stringify(result.auth));
               navigate('/'); 
            }
            else{
                alert("please enter correct details") ;
            }
         }
    return (
        <div className='login'>
           <input className='inputBox' type='text' placeholder='Enter email'
           onChange={(e)=>setEmail(e.target.value)} value={email}></input>
           <input className='inputBox' type='password' placeholder='Enter password'
             onChange={(e)=>setPassword(e.target.value)} value={password}></input>
           <button onClick={handleLogin} className ='appButton' type='button'>Login</button>
        </div>
)}

export default Login;