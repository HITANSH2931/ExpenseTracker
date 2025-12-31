import React from 'react'
import { Wallet,ArrowUpCircle,ArrowDownCircle } from 'lucide-react'

const Dashboard1 = ({income,expense}) => {
  return (
       <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-7 mt-5">

          <div className="bg-white rounded-lg p-4 flex gap-2.5">
             <Wallet className="bg-purple-700 text-white w-8 h-8 rounded-full p-2 "/>

             <div className="flex flex-col gap-0.5">
               <span className="text-gray-800  font-semibold text-[12px]">Total Balance</span>
               <h1 className="text-[15px] font-bold">₹ {income-expense}</h1>
             </div>

          </div>

           <div className="bg-white rounded-lg p-4 flex gap-2.5">
             <ArrowUpCircle className="bg-green-700 text-white w-8 h-8 rounded-full p-2 "/>

             <div className="flex flex-col gap-0.5">
               <span className="text-gray-800  font-semibold text-[12px]">Total Income</span>
               <h1 className="text-[15px] font-bold">₹ {income}</h1>
             </div>

          </div>


           <div className="bg-white rounded-lg p-4 flex gap-2.5">
             <ArrowDownCircle className="bg-red-700 text-white w-8 h-8 rounded-full p-2 "/>

             <div className="flex flex-col gap-0.5">
               <span className="text-gray-800  font-semibold text-[12px]">Total Expense</span>
               <h1 className="text-[15px] font-bold">₹ {expense}</h1>
             </div>

          </div>

        </div>
  )
}

export default Dashboard1
