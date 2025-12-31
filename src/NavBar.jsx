import { List } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router'
import MobileDropDown from './MobileDropDown';
import { logout } from './Redux/AuthRedux';

const NavBar = () => {

    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.user.token);
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () =>{

        dispatch(logout());
        navigate("/login")
    }
    
  return (

   <nav className='flex justify-around items-center mt-5 '>

    <div className='flex gap-2 items-center' onClick={() => navigate("/")}>
        <img src='expense.png' className='hidden sm:block h-20 w-24 lg:h-28 lg:w-32'/>
         <h1 className='text-purple-700 text-xl lg:text-2xl font-bold'>Expense Tracker</h1>
    </div>

   {location.pathname === "/" && <div className='hidden md:block text-lg font-semibold text-purple-600 text-[16px]'>
        <ul className='flex items-center gap-5 ' >
            <li className='hover:text-purple-700 hover:underline hover:pb-0.5'>
                <a href="#home">Home</a></li>
            <li className='hover:text-purple-700 hover:underline hover:pb-0.5'>
                <a href="#stats">Statistics</a></li>
            <li className='hover:text-purple-700 hover:underline hover:pb-0.5'>
                <a href="#benefits">Benefits</a></li>
            <li className='hover:text-purple-700 hover:underline hover:pb-0.5'>
                <a href="#features">Features</a></li>
           
        </ul>
        
    </div>}


   {location.pathname === "/" && <div className='block md:hidden '>

        <MobileDropDown/>
    
    </div>}

     {!token &&<div className='flex items-center gap-1.5'>

         <Link to="/login" ><button className='text-[16px] text-purple-600 hover:text-purple-700 font-semibold border-2 border-solid border-purple-600 rounded-lg text-lg px-7 py-1.5'>Login</button></Link>
      
     </div>}

     {token && <button onClick={() => handleLogout()} className='text-[16px] text-purple-600 hover:text-purple-700 font-semibold border-2 border-solid border-purple-600 rounded-lg text-lg px-7 py-1.5'>Logout</button>}

   </nav>

  )
}
 
export default NavBar
