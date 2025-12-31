import React, { useEffect, useState } from 'react'
import {Link, useSearchParams} from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { getAllCategories,getAllExpenses,getAllGoals,getAllIncomes,getAllLedgers } from '../Function';
import { login, setAllCateogries,setAllExpenses,setAllGoals,setAllIncomes,setAllLedgers } from '../Redux/AuthRedux';
import baseUrl from '../Config';

const Login = () => {

 const{register,handleSubmit,formState:{errors}} = useForm({mode:'onChange'});
 const[send,setSend] = useState(false);
 const[error,setError] = useState('');
 const dispatch = useDispatch();


 const SubmitForm = async (data) =>{

    setSend(true);

    try{

        const response = await axios.post(`${baseUrl}/login`,{
            ...data
        })

        dispatch(login(response.data));
        console.log(response.data);

        getAllCategories(response.data.token,dispatch,setAllCateogries);
        getAllExpenses(response.data.token,dispatch,setAllExpenses);
        getAllIncomes(response.data.token,dispatch,setAllIncomes);
        getAllGoals(response.data.token,dispatch,setAllGoals);
        getAllLedgers(response.data.token,dispatch,setAllLedgers);



    }

    catch(error){

        console.log(error)
        setError(error.response.data);
        setTimeout(() => setError(''),4000)
    }

    finally{

        setSend(false);
        
    }
 }

   const googleLogin = () =>{

     window.location = "http://localhost:8080/oauth2/authorization/google"
   }

   const githubLogin = () =>{

         window.location = "http://localhost:8080/oauth2/authorization/github"

    }  

  return (
    <div className='flex h-150  justify-center items-center'>

        <form onSubmit={handleSubmit(SubmitForm)} className='w-90 p-12 rounded-lg shadow-[0_0_8px_gray] flex flex-col gap-6'>

            {error && <p className='bg-pink-200 text-center text-[14px] text-red-500 font-semibold  px-2.5 py-2 rounded-lg'>{error}</p>}

            <h1 className='text-2xl font-bold text-center'>Login to your account</h1>


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

            <button className={`${send?'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'} text-white  font-semibold text-[15px] rounded-lg px-2.5 py-2`}>Login</button>

            <div className='text-[14px] flex flex-col gap-2'>
               <p className='text-center'> Dont Have an Account ? <Link to="/signUp" className='text-purple-600 hover:text-purple-700 font-bold'>SignUp</Link></p>
               <p className='text-center'>or continue with</p>
            </div>


            <div className='flex flex-col gap-2.5'>

                <div onClick={() => googleLogin()} className='flex items-center justify-center gap-2.5 rounded-lg px-2.5 py-2 shadow-[0_0_2px_gray] text-purple-600 font-semibold hover:text-purple-700 text-[14px] hover:border hover:border-solid  hover:border-purple-700'>
                 <img src="Google.png" className='h-8 w-9'/>
                 <button type='button'>Login with Google</button>
                 </div>

                 <div onClick={() => githubLogin()} className='flex items-center justify-center gap-2.5 rounded-lg px-2.5 py-1.5 shadow-[0_0_2px_gray] text-purple-600 font-semibold hover:text-purple-700 text-[14px]  hover:border hover:border-solid  hover:border-purple-700'> 
                 <img src='Github.png' className='h-10 w-12'/>
                 <button type='button'>Login with GitHub</button>
                 </div>

            </div>



          



        </form>
      
    </div>
  )
}

export default Login
