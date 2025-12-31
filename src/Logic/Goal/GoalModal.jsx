import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { addGoal } from '../../Redux/AuthRedux';
import { formatDate } from '../../Date-Convert/DateEnglish';
import baseUrl from '../../Config';


const GoalModal = ({setModal}) => {

    const{register,handleSubmit,formState:{errors},reset,watch} = useForm({mode:'onChange'});
    const[send,setSend] = useState(false);
    const token = useSelector((state) => state.auth.user.token);
    const dispatch = useDispatch();

    const date = watch('startDate');


    const SubmitForm =  async (data) =>{

        console.log(data);

               setSend(true);

        try{

            const response = await axios.post(`${baseUrl}/addGoal`,{
                ...data
            },{

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            response.data.startDate = formatDate(response.data.startDate);
            response.data.dueDate = formatDate(response.data.dueDate);
            console.log(response.data)
            dispatch(addGoal(response.data));
        

            toast.success("Goal created Successfully",{
                className:'text-[14px] text-gray-700 font-semibold rounded-lg'
            });
        }

        catch(error){

            console.log(error);
        }

        finally{

            setSend(false);
            reset();
            setModal(false);
        }


    }

  return (
      <div className='fixed inset-0 flex justify-center items-center backdrop-blur-md'>

        <form onSubmit={handleSubmit(SubmitForm)} className='bg-white rounded-lg p-8 w-[360px] flex flex-col gap-8'>
    
        <div className='flex justify-between items-center'>
         <h1 className='text-xl font-bold text-center'>Add Goal</h1>
         <X  onClick={() => setModal(false)} className='w-5 h-5  hover:bg-black hover:text-white hover:rounded-full '/>

         </div>

         
         <div className='flex flex-col gap-1'>

                <h1 className='text-[13px] font-bold'>Name of Goal</h1>
                <input type='text'  className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none'
                {...register('name',{required:'Name is Required'})}
                />

               {errors.name && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.name.message}</p>}

            </div>

            


                <div>
                <h1 className='text-[13px] font-bold'>Amount</h1>
                <input type='text' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none w-full'
                {...register('amount',{required:'Amount is Required',validate:(value) => {
                if (isNaN(value)) return 'Only numbers are allowed';
                if (parseFloat(value) <= 0) return 'Amount must be greater than 0';
                const digits = value.replace('.', '');
                if (digits.length > 15) return 'Amount cannot exceed 15 digits';
                 return true;
      }})}
                />

               {errors.amount && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.amount.message}</p>}

            </div>


              <div>
                <h1 className='text-[13px] font-bold'>Start Date</h1>
                <input type='date' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none w-full'
                {...register('startDate',{required:'Date is Required',validate:(value) =>{

                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(5, 30, 0, 0);

                    return selectedDate <= today || "Date cannot be in the future";
                }
             
               })}
                />

               {errors.startDate && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.startDate.message}</p>}

            </div>

             <div>
                <h1 className='text-[13px] font-bold'>Due Date</h1>
                <input type='date' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none w-full'
                {...register('dueDate',{required:'Date is required',validate:(value) =>{

                    const dueDate = new Date(value);
                    const startDate = new Date(date);
                   
                    return startDate <= dueDate || "Due Date cannot be before Start Date";
                }
             
               })}
                />

               {errors.dueDate && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.dueDate.message}</p>}

            </div>

            <button disabled={send} className={`${send ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-blue-600'}  text-white px-2.5 py-1.5 rounded-lg text-[14px] hover:bg-blue-700 font-semibold`}>Submit</button>

        </form>
      
    </div>
  )
}

export default GoalModal
