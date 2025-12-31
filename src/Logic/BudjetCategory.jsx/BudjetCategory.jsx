import React from 'react'
import { useSelector } from 'react-redux'
import PieChartGraph from '../Dashboard/PieChartGraph';
import PieGraph from './PieGraph';
import { AlertCircle, AlertTriangle, CheckCircle, Circle } from 'lucide-react';

const BudjetCategory = () => {

   const categories = useSelector((state) => state.auth.category);
   const categoriesList  =categories.filter((cat) => cat.type == "EXPENSE");
   const expense = useSelector((state) => state.auth.expense);

   const totalExpense = expense.reduce((acc, curr) => {
   const { cateId, expense } = curr;

   acc[cateId] = (acc[cateId] || 0) + expense;
   return acc;
   }, {});

console.log(totalExpense);


  return (
    <div className='sm:ml-7 mt-7'>

        <h1 className='text-lg font-bold'>Monitor Your Category-Wise Expense Budget</h1>

        {categoriesList.length == 0 && <p className='text-gray-800 font-semibold mt-5'>No categories for Expense have been created yet</p>}

        <div className='grid grid-cols-1 gap-y-5 mt-8'>
  
             {categoriesList.map((cat,index) =>(

              <div className='grid grid-cols-1 space-y-3 sm:grid-cols-2 bg-white p-5 rounded-lg '>
              
              <div className='flex justify-between items-center px-2.5 py-2 hover:rounded-lg hover:bg-gray-100 group'>
                   
                    <div className='flex gap-3 items-center'>
                    <span className='text-xl bg-pink-50 rounded-full p-0.5'>{cat.emoji}</span>

                    <div className='flex flex-col gap-0.5 '>
                    <h1 className='text-[14px] font-semibold'>{cat.name}</h1>
                    <h2 className='text-[12px]'>{cat.type}</h2>
                    </div>

                    </div>

                    <div>

                        { totalExpense[cat.id] || 0 >= cat.budjet ? 

                         <div className='flex flex-col items-center gap-2.5'>

                            <h1 className='text-red-700 font-bold'>Over Budjet</h1>
                            <AlertTriangle className='text-red-700'/>

                         </div> :
                         
                         <div className='flex flex-col items-center gap-2.5'>

                            <h1 className='text-green-700 font-bold'>In Budjet</h1>
                            <CheckCircle className='text-green-700'/>

                         </div>   }
                    </div>    

                
                </div> 

                   <PieGraph budjet={cat.budjet} spend={totalExpense[cat.id] || 0}/>

                 <div>
                        
                     
                </div>

               </div> 
                
                  
            ))}


        </div>

       
      
    </div>
  )
}

export default BudjetCategory
