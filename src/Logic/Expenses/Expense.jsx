import React, { useState } from 'react'
import { Delete, Edit, Minus, Plus, Trash, TrendingDown, TrendingUp } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import baseUrl from '../../Config'
import { deleteExpense, deleteIncome } from '../../Redux/AuthRedux'
import axios from 'axios'
import ExpenseModal from './ExpenseModal'
import EditExpenseModal from './EditExpenseModal'
import LineChartComponent from './LineChartComponent'
import { toast } from 'react-toastify'

const Expense = () => {

  const expenses = useSelector((state) => state.auth.expense);
  const[modal,setModal] = useState(false);
  const[editModal,setEditModal] = useState(false);
  const[expense,setExpense] = useState();
  const[send,setSend] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.user.token);
   
  const[chartData,setChartData] = useState([...expenses].sort((a,b) => new Date(a.date) - new Date(b.date)));

  const deleteExpenseSource = async(e) =>{

      console.log('hello');

      setSend(true);

      try{

         const response = await axios.delete(`${baseUrl}/deleteExpense/${e.id}`,{

          headers:{
            Authorization:`Bearer ${token}`
          }
         })

         dispatch(deleteExpense(e));

         setChartData((prev) => prev.filter((exp) => exp.id != e.id))

          toast.warn("Expense deleted Successfully",{
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
           <h1 className='text-lg font-bold'>Expense Overview</h1>
           <p className='text-[13px] text-gray-700'>Track your expenses over time and analyze your expense trends</p>
        </div>


         <button onClick={() =>setModal(true)} className='bg-red-100 hover:bg-red-200 text-red-800 rounded-lg px-3.5 py-1.5 text-[13px] flex items-center gap-1.5 font-bold'>
               <Plus className='w-4 h-4'/>Add Expense</button>
    
        </div>

         {expenses.length == 0 && 
        <div className='font-semibold text-gray-800 text-[15px] mt-5'>
           No expense have been created yet
        </div>}


         <div >
         <LineChartComponent data={chartData}/>
         </div>

    </div>

    <div className='bg-white rounded-lg mt-10 p-6'>
      <h1 className='text-lg font-bold'>Expense Sources</h1>
     {expenses.length == 0 && <h1 className='bg-gray-4 text-[14px] text-gray-600 font-semibold mt-5'>No expenses added yet Click on Add Expense to get started</h1>}

                 
                 <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6 mt-5'>
                 
                 {expenses.map((e,index)=>(

      
                 <div key={index} className='flex justify-between items-center px-2.5 py-2 hover:rounded-lg hover:bg-gray-100 group'>
                   
                    <div className='flex gap-3 items-center'>
                    <span className='text-xl bg-pink-50 rounded-full p-0.5'>{e.emoji}</span>

                    <div className='flex flex-col gap-0.5 '>
                    <h1 className='text-[14px] font-semibold'>{e.name}</h1>
                    <h2 className='text-[12px]'>{e.date}</h2>
                    </div>
                    </div>

                   
                    <div className='flex items-center gap-2.5'>

                     
                     <Edit onClick={() =>{ setEditModal(true); setExpense(e);}} className={` ${send ? 'cursor-not-allowed' : ''} text-blue-600  hover:text-blue-700 w-4 h-4 opacity-0 group-hover:opacity-100`}/>
                     <Trash onClick={() => deleteExpenseSource(e)} className={` ${send ? 'cursor-not-allowed' : ''} text-red-600  hover:text-red-700 w-4 h-4 opacity-0 group-hover:opacity-100`}/>
                  
                    <div className='text-[12px] text-red-700 font-bold flex items-center gap-1 bg-red-100 hover:bg-red-200 rounded-lg px-2 py-1'>
                      <Minus className='w-4 h-4'/>
                      <span>{e.expense}</span>
                      <TrendingDown className='w-4 h-4'/>
                    </div>

                    </div>

                    
                </div> 
     
     ))}

     </div>

            
    </div>

    {modal && <ExpenseModal setModal={setModal} setChartData={setChartData}/>}
    {editModal && <EditExpenseModal setEditModal={setEditModal} setChartData={setChartData} e={expense} />}

    </div>
  )
}

export default Expense
