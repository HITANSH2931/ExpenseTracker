import React, { useState } from 'react'
import { Delete, Edit, Plus, Trash, TrendingUp } from 'lucide-react'
import LineChartComponent from './LineChartComponent'
import { useDispatch, useSelector } from 'react-redux'
import IncomeModal from './IncomeModal'
import { formatDate } from '../../Date-Convert/DateEnglish';
import EditIncomeModal from './EditIncomeModal'
import { deleteIncome, updateGoal } from '../../Redux/AuthRedux'
import axios from 'axios'
import { toast } from 'react-toastify'
import baseUrl from '../../Config'

const Income = () => {

  const incomes = useSelector((state) => state.auth.income);
  const[modal,setModal] = useState(false);
  const[editModal,setEditModal] = useState(false);
  const[income,setIncome] = useState();
  const[send,setSend] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
   
  const[chartData,setChartData] = useState([...incomes].sort((a,b) => new Date(a.date) - new Date(b.date)));

  console.log(chartData);

  const deleteIncomeSource = async(i) =>{

      console.log('hello');

      setSend(true);

      try{

         const response = await axios.delete(`${baseUrl}/deleteIncome/${i.id}`,{

          headers:{
            Authorization:`Bearer ${token}`
          }
         })

         dispatch(deleteIncome(i));
         
         response.data.forEach((g) => {
                     
                   g.startDate =   formatDate(g.startDate);
                   g.dueDate =   formatDate(g.dueDate)
                 
         })

         dispatch(updateGoal(response.data));

         setChartData((prev) => prev.filter((inc) => inc.id != i.id))

          toast.warn("Income deleted Successfully",{
                         className:'text-[14px] text-red-700 font-semibold rounded-lg'
                     });
      }

      catch(error){


        console.log(error)


      }

      finally{

        setSend(false);
      }
  }


  return (
    
    <div className='mt-7 sm:ml-7'>

    <div className='bg-white rounded-lg p-6'>
        
       <div className='flex justify-between items-center'>
       
        <div>
           <h1 className='text-lg font-bold'>Income Overview</h1>
           <p className='text-[13px] text-gray-700'>Track your earnings over time and analyze your income trends</p>
        </div>


         <button onClick={() =>setModal(true)} className='bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-3.5 py-1.5 text-[13px] flex items-center gap-1.5 font-bold'>
               <Plus className='w-4 h-4'/>Add Income</button>
    
        </div>

        {incomes.length == 0 && 
        <div className='font-semibold text-gray-800 text-[15px] mt-5'>
           No income have been created yet
        </div>}

         <div >
         <LineChartComponent data={chartData}/>
         </div>

    </div>

    <div className='bg-white rounded-lg mt-10 p-6'>
      <h1 className='text-lg font-bold'>Income Sources</h1>
     {incomes.length == 0 && <h1 className='bg-gray-4 text-[14px] text-gray-600 font-semibold mt-5'>No incomes added yet Click on Add Income to get started</h1>}

                 
                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-5'>
                 
                 {incomes.map((i,index)=>(

      
                 <div key={index} className='flex justify-between items-center px-2.5 py-2 hover:rounded-lg hover:bg-gray-100 group'>
                   
                    <div className='flex gap-3 items-center'>
                    <span className='text-xl bg-pink-50 rounded-full p-0.5'>{i.emoji}</span>

                    <div className='flex flex-col gap-0.5 '>
                    <h1 className='text-[14px] font-semibold'>{i.name}</h1>
                    <h2 className='text-[12px]'>{i.date}</h2>
                    </div>
                    </div>

                   
                    <div className='flex items-center gap-2.5'>

                     
                     <Edit onClick={() =>{ setEditModal(true); setIncome(i);}} className={` ${send ? 'cursor-not-allowed' : ''} text-blue-600  hover:text-blue-700 w-4 h-4 opacity-0 group-hover:opacity-100`}/>
                     <Trash onClick={() => deleteIncomeSource(i)} className={` ${send ? 'cursor-not-allowed' : ''} text-red-600  hover:text-red-700 w-4 h-4 opacity-0 group-hover:opacity-100`}/>
                  
                    <div className='text-[12px] text-green-700 font-bold flex items-center gap-1 bg-green-100 hover:bg-green-200 rounded-lg px-2 py-1'>
                      <Plus className='w-4 h-4'/>
                      <span>{i.income}</span>
                      <TrendingUp className='w-4 h-4'/>
                    </div>

                    </div>

                    
                </div> 
     
     ))}

     </div>

            
    </div>

    {modal && <IncomeModal setModal={setModal} setChartData={setChartData}/>}
    {editModal && <EditIncomeModal setEditModal={setEditModal} setChartData={setChartData} i={income} />}

    </div>
  )
}

export default Income
