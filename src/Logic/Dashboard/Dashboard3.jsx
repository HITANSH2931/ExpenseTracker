import { Minus, Plus, TrendingDown, TrendingUp } from 'lucide-react'
import { formatDate } from '../../Date-Convert/DateEnglish'

const Dashboard3 = ({expenseList,incomeList}) => {
  return (
    <div className='mt-10  grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5'>

        <div className='bg-white rounded-lg p-4 grid-cols-1 gap-y-6'>

            <h1 className='font-lg font-bold mb-4'>Recent Expense</h1>

               {expenseList.length == 0 && <p className='font-semibold text-[15px] text-gray-800'>No Expenses to show</p>}

                {expenseList.map((e,index)=>(

                 <div key={index} className='flex justify-between items-center px-2.5 py-2 hover:rounded-lg hover:bg-gray-100 group'>
                   
                    <div className='flex gap-3 items-center'>
                    <span className='text-xl bg-pink-50 rounded-full p-0.5'>{e.emoji}</span>

                    <div className='flex flex-col gap-0.5 '>
                    <h1 className='text-[14px] font-semibold'>{e.name}</h1>
                    <h2 className='text-[12px]'>{formatDate(e.date)}</h2>
                    </div>
                    </div>

                  
                    <div className='text-[12px] text-red-700 font-bold flex items-center gap-1 bg-red-100 hover:bg-red-200 rounded-lg px-2 py-1'>
                      <Minus className='w-4 h-4'/>
                      <span>{e.expense}</span>
                      <TrendingDown className='w-4 h-4'/>
                    </div>
            
                </div> 
     
     ))}

        </div>


         <div className='bg-white rounded-lg p-4 grid-cols-1 gap-y-6'>

            <h1 className='font-lg font-bold mb-4'>Recent Income</h1>

              {incomeList.length == 0 && <p className='font-semibold text-[15px] text-gray-800'>No incomes to show</p>}

                {incomeList.map((i,index)=>(

                 <div key={index} className='flex justify-between items-center px-2.5 py-2 hover:rounded-lg hover:bg-gray-100 group'>
                   
                    <div className='flex gap-3 items-center'>
                    <span className='text-xl bg-pink-50 rounded-full p-0.5'>{i.emoji}</span>

                    <div className='flex flex-col gap-0.5 '>
                    <h1 className='text-[14px] font-semibold'>{i.name}</h1>
                    <h2 className='text-[12px]'>{formatDate(i.date)}</h2>
                    </div>
                    </div>

                  
                    <div className='text-[12px] text-green-700 font-bold flex items-center gap-1 bg-green-100 hover:bg-green-200 rounded-lg px-2 py-1'>
                      <Plus className='w-4 h-4'/>
                      <span>{i.income}</span>
                      <TrendingUp className='w-4 h-4'/>
                    </div>
            
                </div> 
     
     ))}

        </div>

     
      
    </div>
  )
}

export default Dashboard3
