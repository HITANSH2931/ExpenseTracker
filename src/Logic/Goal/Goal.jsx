import React from 'react'
import GoalModal from './GoalModal';
import { useState } from 'react';
import { Plus, Clock, Loader, CheckCircle} from 'lucide-react';
import { useSelector } from 'react-redux';
import GoalPieChart from './GoalPieChart';


const Goal = () => {

    const [modal,setModal] = useState(false);
    const goals = useSelector((state) => state.auth.goal)

  return (

     <div className='sm:ml-7 mt-7'>

        <div className='flex items-center justify-between'>
        
        <div className='flex flex-col gap-2.5'>
        <h1 className='text-xl font-bold'>Create a Savings Goal</h1>
        <p className='text-gray-800 font-semibold text-[14px]'>Decide how much you want to save and by when. You can start adding money immediately when income is created or added.</p>
        </div>

         <button onClick={() =>setModal(true)} className='bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-3.5 py-1.5 text-[13px] flex items-center gap-1.5 font-bold'>
               <Plus className='w-4 h-4'/>Add Goal</button>
    
        </div>

         <div className='grid grid-cols-1 gap-y-5 mt-10'>

        {goals.map((g,index) => (

            <div className=' grid grid-cols-1 sm:grid-cols-2'>

            <div className='bg-white hover:bg-gray-100 rounded-lg px-2.5 py-3.5 flex items-center justify-between'>

            <div>
                <h1 className='font-bold text-[15px]'>{g.name}</h1>
               
                <p className='text-[13px] text-gray-700 font-semibold'>Amount : {g.amount}</p>
                <p className='text-[13px] text-gray-700 font-semibold'>Start Date -{g.startDate}</p>
                <p className='text-[13px] text-gray-700 font-semibold'>Due Date - {g.dueDate}</p>
            </div>


            <div className='flex flex-col items-center'>
               {g.goalStatus == "PENDING" ? <Clock /> : g.goalStatus == "IN_PROGRESS" ? <Loader/> : <CheckCircle/>}
                <span className='text-gray-700 font-bold text-[13px]'>{g.goalStatus}</span>
            </div> 


            </div> 

            <div>

                <GoalPieChart amount={g.amount} currentAmount={g.currentAmount}/>
        
             </div> 

            </div> 
        ))}

        </div>

        {modal && <GoalModal setModal={setModal}/>}

        
      
    </div>
  )
}

export default Goal
