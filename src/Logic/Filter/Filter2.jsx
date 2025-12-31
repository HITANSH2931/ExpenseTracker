import React from 'react'
import { formatDate } from '../../Date-Convert/DateEnglish'
import { Plus,Minus,TrendingUp,TrendingDown } from 'lucide-react'

const Filter2 = ({transactionData,send}) => {
  return (
    <div className='bg-white p-5 rounded-lg mt-8'>

        <div className='flex flex-col gap-3.5'>
        <h1 className='text-lg font-bold'>Transactions</h1>
        <p className='text-[13px] text-gray-800 font-semibold'>Select the filters and click apply to filter the transactions</p>
        </div>

        {send ? <div className='mt-10 text-gray-800 text-[15px] font-semibold'>Loading transactions.....</div> :

         <div>

           {transactionData  && transactionData.length==0 ? 
            
             <div className='text-gray-800 text-[14px] font-semibold mt-10'>No Transactions to Show</div> :

             <div className='grid grid-cols-1 gap-y-5 mt-10'>

                 {transactionData.map((t,index) => (

              <div key={index} className='flex justify-between items-center px-2.5 py-2 hover:rounded-lg hover:bg-gray-100 group'>
                   
                    <div className='flex gap-3 items-center'>
                    <span className='text-xl bg-pink-50 rounded-full p-0.5'>{t.emoji}</span>

                    <div className='flex flex-col gap-0.5 '>
                    <h1 className='text-[14px] font-semibold'>{t.name}</h1>
                    <h2 className='text-[12px]'>{formatDate(t.date)}</h2>
                    </div>
                    </div>
                
                    <div className={`text-[12px] ${t.type === "income" ? 'text-green-700 bg-green-100 hover:bg-green-200' : 'text-red-700 bg-red-100 hover:bg-red-200'}   font-bold flex items-center gap-1 rounded-lg px-2 py-1`}>
                     
                      {t.type==="income" ? <Plus className='w-4 h-4'/> : <Minus className='w-4 h-4'/>}
                      <span>{t.amount}</span>
                      {t.type==="income" ? <TrendingUp className='w-4 h-4'/> : <TrendingDown className='w-4 h-4'/> }

                    </div>

                    </div>

        ))}
             </div>
        
             }

         </div>
        
    
        }
      
    </div>
  )
}

export default Filter2
