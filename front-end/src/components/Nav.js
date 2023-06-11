import React from 'react';
import {Link,useNavigate} from 'react-router-dom';
 
const Nav = ()=>{
    const auth = localStorage.getItem('user');
    const Navigate = useNavigate();
    const logout =()=>
    {
        localStorage.clear();
        Navigate('/signup');
    }
    return(
        <div>
            <img src='https://www.luminaryleadership.net/news/wp-content/uploads/2012/07/Logo-black.jpg'
            alt='logo' className='logo'/>
            { auth?
            <ul className="nav-ul">
                <li><Link to ='/'>Products</Link></li>
                <li><Link to ='/add'>Add Products</Link></li>
                <li><Link to ='/update'>Update Products</Link></li>
                <li><Link to ='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to ='/signup'>Logout ({JSON.parse(auth).name})</Link></li> 
                </ul>
                : 
               <ul className='nav-ul nav-right' >
                 
                    <li><Link to ='/signup'>Sign Up</Link></li>
                    <li><Link to ='/login'>Login </Link></li>
                   
               </ul>
           
 }
  </div>
    )
}

export default Nav;