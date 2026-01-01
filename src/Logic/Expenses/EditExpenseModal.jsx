import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { X } from 'lucide-react';
import { addIncome, editExpense, editIncome } from '../../Redux/AuthRedux';
import { toast } from 'react-toastify';
import baseUrl from '../../Config';


const EditExpenseModal = ({setEditModal,setChartData,e}) => {
    
    const{register,handleSubmit,formState:{errors},reset} = useForm({mode:'onChange',defaultValues:{...e,date:new Date(e.date).toISOString().split("T")[0]}});
    const[error,setError] =useState('');
    const token = useSelector((state) => state.auth.user.token);
    const[send,setSend] = useState(false);
    const dispatch = useDispatch();

    const categories = useSelector((state) => state.auth.category);
    const Expensecat = categories.filter((cat) => cat.type === 'EXPENSE');

    const SubmitForm =  async (data) =>{

        console.log(data);

          setSend(true);

        try{

            const response = await axios.put(`${baseUrl}/updateExpense`,{
                ...data
            },{

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            dispatch(editExpense(response.data));

            setChartData((prev) =>{

                const newChartData = [...prev.filter((exp) => exp.id != data.id),response.data];

                newChartData.sort((a,b) => new Date(a.date) - new Date(b.date));
            
                return newChartData;
            })

             toast.info("Expense edited Successfully",{
                            className:'text-[14px] text-gray-700 font-semibold rounded-lg'
                        });
    
           
        }

        catch(error){

            console.log(error);
            toast.info("Expense already exists with same name",{
                                        className:'text-[14px] text-gray-700 font-semibold rounded-lg'
                                    });
           
        }

        finally{

            setSend(false);
            reset();
            setEditModal(false);
        }


      

    }

  return (
    <div className='fixed inset-0 flex justify-center items-center backdrop-blur-md'>

        <form onSubmit={handleSubmit(SubmitForm)} className='bg-white rounded-lg p-8 w-[360px] flex flex-col gap-8'>
    
        <div className='flex justify-between items-center'>
         <h1 className='text-xl font-bold text-center'>Edit Expense</h1>
         <X  onClick={() => setEditModal(false)} className='w-5 h-5  hover:bg-black hover:text-white hover:rounded-full '/>

         </div>

         
         <div className='flex flex-col gap-1'>

                <h1 className='text-[13px] font-bold'>Expense Source</h1>
                <input type='text'  className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none'
                {...register('name',{required:'Name is Required'})}
                />

               {errors.name && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.name.message}</p>}

            </div>

             <div className='flex flex-col gap-1'>
                <h1 className='text-[13px] font-bold'>Expense Category</h1>

                <select className='border border-solid border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] focus:outline-none' defaultValue="" 
                 {...register('cateId',{required:'Category Type is Required'})}
                >
                    <option value="" disabled>Choose Category</option>

                    {Expensecat.map((cat) =>(

                        <option value={cat.id}>{cat.name}</option>
                    ))}
                   
                </select>

                  {errors.cateId && <p className='text-[12px] text-red-600  font-semibold pl-1'>{errors.cateId.message}</p>}

                
            </div>

                <div>
                <h1 className='text-[13px] font-bold'>Amount</h1>
                <input type='text' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none w-full'
                {...register('expense',{required:'Amount is Required', pattern: {
               value: /^[0-9]+$/,
               message: "Only numbers allowed",
               }})}
                />

               {errors.expense && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.expense.message}</p>}

            </div>


              <div>
                <h1 className='text-[13px] font-bold'>Date</h1>
                <input type='date' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none w-full'
                {...register('date',{required:'Date is Required',validate:(value) =>{

                    const selectedDate = new Date(value);
                    const today = new Date();
                    today.setHours(5, 30, 0, 0);

                    return selectedDate <= today || "Date cannot be in the future";
                }
             
               })}
                />

               {errors.date && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.date.message}</p>}

            </div>



            

            <button disabled={send} className={`${send ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-blue-600'}  text-white px-2.5 py-1.5 rounded-lg text-[14px] hover:bg-blue-700 font-semibold`}>Submit</button>

        </form>
      
    </div>
  )
}

export default EditExpenseModal
