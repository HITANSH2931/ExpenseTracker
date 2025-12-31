import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { updateGoal } from '../../Redux/AuthRedux';
import { formatDate } from '../../Date-Convert/DateEnglish';
import baseUrl from '../../Config';

const GoalContribution = ({setModal,incomeId,amount}) => {

    const{register,handleSubmit,formState:{errors},reset,getValues} = useForm({mode:'onChange'});
    const[send,setSend] = useState(false);
    const token = useSelector((state) => state.auth.user.token);
    const dispatch = useDispatch();

    const goals = useSelector((state) => state.auth.goal);

    const[goalContribution,setContribution] =  useState([]);
    const[remaining,setRemaining] = useState(amount);


    const availableGoals =  goals.filter(
    goal => !goalContribution.some(c => c.goalId==goal.id) && new Date() < new Date(goal.dueDate)
   );


   console.log(amount,remaining);
   
    const handleGoal = () =>{

        const data = getValues();
        console.log(data);

        setContribution((prev) => [...prev,{incomeId,...data}])

        setRemaining((prev) => prev-data.amount);

        reset({amount:'0'})


    } 

    const SubmitForm =  async (data) =>{

        console.log(data);
        console.log(goalContribution)

               setSend(true);

        try{

            const response = await axios.put(`${baseUrl}/updateGoal`,{
               goalRequestList:goalContribution
            },{

                headers:{
                    Authorization:`Bearer ${token}`
                }
            })

          response.data.forEach((g) => {
            
           g.startDate  = formatDate(g.startDate);
           g.dueDate = formatDate(g.dueDate)
        
        })
            
          console.log(response.data);
          dispatch(updateGoal(response.data));
        

           
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

       <form  className='bg-white rounded-lg p-8 w-[360px] '>

     {remaining !=0 && goalContribution.length != goals.length ? <div className='flex flex-col gap-8'>

       <div className='flex justify-between items-center'>
         <h1 className='text-xl font-bold text-center'>Use Your Income to Fund Your Goals</h1>
         <X  onClick={() => setModal(false)} className='w-5 h-5  hover:bg-black hover:text-white hover:rounded-full '/>

         </div>



      <div className='flex flex-col gap-1'>

            <h1 className='text-[13px] font-bold'>Select Goal Type</h1>

             <select className='border border-solid border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] focus:outline-none'
              {...register('goalId',{required:'Goal Type is Required'})}
             >

                {availableGoals.map((goal,index) =>(

                    <option key={index} value={goal.id}>{goal.name}</option>
                ))}

             </select>

           {errors.goalId && <p className='text-[12px] text-red-600  font-semibold pl-1'>{errors.goalId.message}</p>}

              
         </div>

          <div>
                <h1 className='text-[13px] font-bold'>Amount</h1>
                <input type='text' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none w-full'
                {...register('amount',{required:'Amount is Required',validate:(value) => {
                if (isNaN(value)) return 'Only numbers are allowed';
                const digits = value.replace('.', '');
                if (digits.length > 15) return 'Amount cannot exceed 15 digits';
                if(Number(value) > Number(remaining)) return "Amount cannot be greater than income earned";
                 return true;
      }})}
                />

               {errors.amount && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.amount.message}</p>}

            </div>

        <button  onClick={handleSubmit(handleGoal)}  className='bg-yellow-600  text-white px-2.5 py-1.5 rounded-lg text-[14px] hover:bg-yellow-700 font-semibold'>Next</button>  
        
        </div> : 

   <button onClick={() => SubmitForm()} disabled={send} className={`${send ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-blue-600'}  text-white px-2.5 py-1.5 rounded-lg text-[14px] hover:bg-blue-700 font-semibold`}>Submit</button>
      
    }
    </form> 
    </div>
  )
}

export default GoalContribution
