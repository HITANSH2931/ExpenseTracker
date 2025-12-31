import axios from 'axios';
import { Search } from 'lucide-react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'
import baseUrl from '../../Config';

const Filter1 = ({setTransactionData,setSend,send}) => {

    const categories = useSelector((state) => state.auth.category);
    const{register,reset,handleSubmit,formState:{errors}} = useForm({mode:'onChange'});
    const token = useSelector((state) => state.auth.user.token);
   
    const SubmitForm = async (data) =>{

        setSend(true);

        try{

            const response = await axios.get(`${baseUrl}/getFilterData`,{

                params:data,

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

            setTransactionData(response.data);
            console.log(response.data);
        }

        catch(error){

            console.log(error);
        }

        finally{

            setSend(false);
        }
    }

  return (
    <div className='bg-white rounded-lg p-5 mt-8'>

        <h1>Select  the filters</h1>

    
       
        <form onSubmit={handleSubmit(SubmitForm)} className='mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-7'>
        
        <div className='flex flex-col gap-1'>

        <span className='text-[14px] font-semibold'>Type</span>
        <select defaultValue="" className='rounded-lg  text-[14px] border border-gray-300 px-2.5 py-2 focus:outline-none'
         {...register('type',{required:'Type is required'})}
        >
            <option value="" disabled>Choose Type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>

        {errors.type && <p className='text-red-700 text-[13px] pl-1 font-semibold'>{errors.type.message}</p>}

        </div>

        <div className='flex flex-col gap-1'>
         <span className='text-[14px] font-semibold'>Category</span>
        <select defaultValue="" className='rounded-lg text-[14px] border border-gray-300 px-2.5 py-2 focus:outline-none'
        {...register('category')}
        >

             <option value=""  disabled>Choose Category</option>

            {categories.map((c,index) =>(

                <option key={index} value={c.id}>{c.name}</option>
            ))}
        </select>
        </div>

        <div className='flex flex-col gap-1'>

        <span className='text-[14px] font-semibold'>Date</span>
        <input type='date' className='text-[14px] px-2.5 py-2 rounded-lg border border-gray-300'
          {...register('date')}
        />

        </div>

        <div className='flex flex-col gap-1'>

        <span className='text-[14px] font-semibold'>Sort Field</span>
        <select defaultValue="" className='rounded-lg  text-[14px] border border-gray-300 px-2.5 py-2 focus:outline-none'
         {...register('sortField')}
        >
            <option value=""  disabled>Choose Field</option>
            <option value="date">Date</option>
            <option value="name">Name</option>
        </select>

        </div>

         <div className='flex flex-col gap-1'>

        <span className='text-[14px] font-semibold'>Sort Order</span>
        <select defaultValue="" className='rounded-lg  text-[14px] border border-gray-300 px-2.5 py-2 focus:outline-none'
         {...register('sortOrder')}
        >
            <option value=""  disabled>Choose Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
        </select>

        </div>

        <div className='flex flex-col gap-1'>

        <span className='text-[14px] font-semibold'>Search</span>
        <input type='text' placeholder='Search.....' className='text-[14px] px-2.5 py-2 rounded-lg border border-gray-300'
         {...register('keyword')}
        />

        </div>

    
         <div className='flex items-center mt-5'>
         <button disabled={send}><Search className={`${send ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-purple-700 hover:bg-purple-800' } text-white  w-8 h-8 rounded-full p-1.5`}/></button>
         </div>

         </form>
    
      
    </div>
  )
}

export default Filter1
