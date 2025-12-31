import React, { useState } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from 'react-redux';

const Verify = () => {

 const[send,setSend] = useState(false);
 const email = useSelector((state) => state.auth.user.email);
 const[data,setData] = useState('');

 const SubmitForm = async () =>{

    setSend(true);

    try{

        const response = await axios.post("http://localhost:8080/verify",{
            
        },{
          params:{
            email:email
          }
        })

        console.log(response.data);
        setData(response.data);
        setTimeout(() => setData(''),5000);
    }

    catch(error){

        console.log(error)
    }

    finally{

        setSend(false);
    }
 }

  return (
    <div className='flex h-150  justify-center items-center'>
  
            <div className='w-90 p-12 rounded-lg shadow-[0_0_8px_gray] flex flex-col gap-6'>

            {!email && <p className='bg-pink-200 text-center text-[14px] text-red-500 font-semibold  px-2.5 py-2 rounded-lg'>You need to First Create an Account</p>}
            
             {data && <p className='bg-pink-200 text-center text-[14px] text-red-500 font-semibold  px-2.5 py-2 rounded-lg'>{data}</p>}

            <h1 className='text-2xl font-bold text-center'>Activate Your Registered Email</h1>
        
          {email && <button onClick={() => SubmitForm()} className={`${send?'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-semibold text-[15px] rounded-lg px-2.5 py-2`}>Verify</button>}

             </div>
    </div>
  )
}

export default Verify
