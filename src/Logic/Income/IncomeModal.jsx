import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { X } from 'lucide-react';
import { addIncome } from '../../Redux/AuthRedux';
import { formatDate } from '../../Date-Convert/DateEnglish';
import { toast } from 'react-toastify';
import GoalContribution from '../Goal/GoalContribution';
import baseUrl from '../../Config';


const IncomeModal = ({setModal,setChartData}) => {
    
    const{register,handleSubmit,formState:{errors},reset} = useForm({mode:'onChange'});
    const[error,setError] =useState('');
    const token = useSelector((state) => state.auth.user.token);
    const[send,setSend] = useState(false);
    const dispatch = useDispatch();

    const[state,setState] = useState(1);

    const categories = useSelector((state) => state.auth.category);
    const Incomecat = categories.filter((cat) => cat.type === 'INCOME');

    const goals = useSelector((state) => state.auth.goal);
    const[amount,setAmount] = useState(0);
    const[id,setId] = useState(0);
    

    const SubmitForm =  async (data) =>{

        console.log(data);

          setSend(true);

        try{

            const response = await axios.post(`${baseUrl}/createIncome`,{
                ...data
            },{

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
            response.data.date = formatDate(response.data.date);
            dispatch(addIncome(response.data));
    
            setChartData((prev) => {

                const newData = [...prev,response.data];

                newData.sort((a,b) => new Date(a.date) - new Date(b.date))

                return newData;
            })

            toast.success("Income created Successfully",{
                className:'text-[14px] text-gray-700 font-semibold rounded-lg'
            });


            if(goals.length != 0){

             setState(2);
             setAmount(data.income);
             setId(response.data.id);

            }



        }

        catch(error){

            console.log(error);
             toast.info("Income already exists with same name",{
                className:'text-[14px] text-gray-700 font-semibold rounded-lg'
            });

        }

        finally{

            setSend(false);
            reset();
          if(goals.length == 0) setModal(false);
        }


      

    }

  return (
    <div className='fixed inset-0 flex justify-center items-center backdrop-blur-md'>

      {state == 1  &&  <form onSubmit={handleSubmit(SubmitForm)} className='bg-white rounded-lg p-8 w-[360px] flex flex-col gap-8'>
    
      <div className='flex justify-between items-center'>
         <h1 className='text-xl font-bold text-center'>{state == 1 ? 'Add Income' : 'Add Contribution Amount'}</h1>
         <X  onClick={() => setModal(false)} className='w-5 h-5  hover:bg-black hover:text-white hover:rounded-full '/>

         </div> 

         
       <div className='flex flex-col gap-1'>

                <h1 className='text-[13px] font-bold'>Income Source</h1>
                <input type='text'  className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none'
                {...register('name',{required:'Name is Required'})}
                />

               {errors.name && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.name.message}</p>}

            </div>

           <div className='flex flex-col gap-1'>
                <h1 className='text-[13px] font-bold'>Income Category</h1>

                <select className='border border-solid border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] focus:outline-none' defaultValue="" 
                 {...register('cateId',{required:'Category Type is Required'})}
                >
                    <option value="" disabled>Choose Category</option>

                    {Incomecat.map((cat) =>(

                        <option value={cat.id}>{cat.name}</option>
                    ))}
                   
                </select>

                  {errors.cateId && <p className='text-[12px] text-red-600  font-semibold pl-1'>{errors.cateId.message}</p>}

                
            </div>

                <div>
                <h1 className='text-[13px] font-bold'>Amount</h1>
                <input type='text' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none w-full'
                {...register('income',{required:'Amount is Required', pattern: {
               value: /^[0-9]+$/,
               message: "Only numbers allowed",
               }})}
                />

               {errors.income && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.income.message}</p>}

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
            
        </form>}
      
      {state == 2 && <GoalContribution amount={amount} incomeId={id} setModal={setModal}/>}
    </div>
  )
}

export default IncomeModal
