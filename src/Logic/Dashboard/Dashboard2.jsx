import { Minus, Plus, TrendingDown, TrendingUp } from 'lucide-react'
import React from 'react'
import { formatDate } from '../../Date-Convert/DateEnglish'
import PieChartGraph from './PieChartGraph'

const Dashboard2 = ({transactionList,income,expense}) => {

    const data = [

        {name:"Income",value:income},
        {name:"Expense",value:expense},
        {name:"Balance",value:income-expense}
    ]

    console.log(transactionList);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-8 mt-10'>

        <div className='grid grid-cols-1 gap-y-4 bg-white rounded-lg p-4'>

        <h1 className='text-lg font-bold '>Recent Transactions</h1>

        {transactionList.length == 0 && <p className='text-gray-800 font-semibold text-[15px]'>No transactions to show</p>}

        {transactionList.map((t,index) => (

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

        <div className='bg-white p-4 rounded-lg '>

            <h1 className='text-lg font-bold mb-2'>Financial Overview</h1>

            <PieChartGraph data={data}/>
             
        </div>

      
    </div>
  )
}

export default Dashboard2
