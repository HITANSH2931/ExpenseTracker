import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { signUp } from '../Redux/AuthRedux';
import baseUrl from '../Config';

const SignUp = () => {

 const{register,handleSubmit,formState:{errors}} = useForm({mode:'onChange'});
 const[send,setSend] = useState(false);
 const[error,setError] = useState('');
 const dispatch = useDispatch();
 const navigate = useNavigate();

 const SubmitForm = async (data) =>{

    setSend(true);

    try{

        const response = await axios.post(`${baseUrl}/signUp`,{
            ...data
        })

        navigate("/login")

       
    }

    catch(error){

        console.log(error)
        setError(error.response.data);
        setTimeout(() => setError(''),4000);
    }

    finally{

        setSend(false);
    }
 }

  return (
    <div className='flex h-150  justify-center items-center'>

        <form onSubmit={handleSubmit(SubmitForm)} className='w-90 p-12 rounded-lg shadow-[0_0_8px_gray] flex flex-col gap-6'>

            {error && <p className='bg-pink-200 text-center text-[14px] text-red-500 font-semibold  px-2.5 py-2 rounded-lg'>{error}</p>}

            <h1 className='text-2xl font-bold text-center'>Create Account</h1>

            <div className='text-[14px] flex flex-col gap-1'>
                <input type='text' placeholder='Name' className='w-full px-2.5 py-2 rounded-lg shadow-[0_0_2px_gray] focus:outline-none'
                {...register('name',{required:'Name is required'})}
                
                />

                {errors.name && <p className='text-[13px] text-red-600 pl-1'>{errors.name.message}</p>}

            </div>

            <div className='text-[14px] flex flex-col gap-1 '>
                <input type='email' placeholder='Email' className='w-full px-2.5 py-2 rounded-lg shadow-[0_0_2px_gray] focus:outline-none'
                 {...register('email',{required:'Email is required'})}
                />

                  
                {errors.email && <p className='text-[13px] text-red-600 pl-1'>{errors.email.message}</p>}


            </div>

            <div className='text-[14px] flex flex-col gap-1'>
                <input type='password' placeholder='Password' className='w-full px-2.5 py-2 rounded-lg shadow-[0_0_2px_gray] focus:outline-none'
                 {...register('password',{required:'Password is required',minLength:{value:8,message:"Password must be at least 8 characters"},
                 maxLength:{value:20,message:"Password must not exceed 20 characters"}
                 })}
                />

                 {errors.password && <p className='text-[13px] text-red-600 pl-1'>{errors.password.message}</p>}


            </div>

            <button className={`${send?'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white  font-semibold text-[15px] rounded-lg px-2.5 py-2`}>SignUp</button>

            <div className='text-[14px] mx-auto'>
                Already Had an Account ? <Link to="/login" className='text-purple-600 hover:text-purple-700 font-bold'>Login</Link>
            </div>



        </form>
      
    </div>
  )
}

export default SignUp
