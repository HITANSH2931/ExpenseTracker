import { Filter, HandCoins, Layers, LayoutDashboard, PiggyBank, Target, TrendingDown, TrendingUp, User, Wallet, X } from 'lucide-react'
import React from 'react'
import Category from './Category/Category';
import Income from './Income/Income';
import Filters from './Filter/Filters';
import { useState } from 'react';
import Dashboard from './Dashboard/Dashboard';
import { useSelector } from 'react-redux';
import Expense from './Expenses/Expense';
import BudjetCategory from './BudjetCategory.jsx/BudjetCategory';
import MobileResponsive from './MobileResponsive';
import Ledger from './Ledger/Ledger';
import Goal from './Goal/Goal';


const Demo = () => {

    const[state,setState] = useState(1);
    const name = useSelector((state) => state.auth.user.username)
    const[open,setOpen] = useState(false);

       const menuItems = [
      { id: 1, label: "Dashboard", icon: LayoutDashboard },
      { id: 2, label: "Category", icon: Layers },
      { id: 3, label: "Income", icon: Wallet },
      { id: 4, label: "Expenses", icon: TrendingDown },
      { id: 5, label: "Filter", icon: Filter },
      { id: 6, label: "Budget Tracker", icon: PiggyBank },
      { id: 7, label: "Money Ledger", icon: HandCoins },
      { id: 8, label: "Saving Goals", icon: Target },
       ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-[20%_80%]  lg:pr-20 bg-purple-50'>

        <div className='hidden md:flex flex-col p-5  gap-8 bg-white rounded-lg h-screen border border-solid border-white mt-5'>

             <div className='flex items-center gap-1.5 px-4.5 py-2.5 hover:bg-gray-100 hover:rounded-lg'>
             <User/>
             <h1 className='text-lg font-bold'>{name}</h1>
             </div>

              {menuItems.map((item,index) =>{

            const Icon = item.icon;
            const active = state === item.id;

            return ( <div onClick={() =>{setState(item.id); setOpen(false)}} className={`${active ? 'bg-purple-700 text-white rounded-lg px-4.5 py-2':''} text-[14px] flex items-center font-semibold gap-3.5`}>
                  
                    <Icon className='w-5 h-5'/>
                    <h1>{item.label}</h1>

               
                   </div>)
         })}
             
             
        </div>

        <div className="md:hidden block px-4 py-3 bg-white shadow mt-4">
        <button onClick={() => setOpen(true)}>
        <Layers />
        </button>
       </div>

     {open && (

     <div className="fixed inset-0 z-50 backdrop-blur-md">

       <div className="w-64 bg-white h-full p-5 ">

     <div className='flex justify-end mt-10'>
      <button className="text-lg font-bold text-purple-700" onClick={() => setOpen(false)}> <X className='text-black '/> </button>
     </div>

      <MobileResponsive state={state} setState={setState} setOpen={setOpen}/>

    </div>
  </div>
)}

        <div>
            {state == 1 && <Dashboard/>}
            {state == 2 && <Category/>}
            {state == 3 && <Income/>}
            {state == 4 && <Expense/>}
            {state == 5 &&  <Filters/>}
            {state == 6 && <BudjetCategory/>}
            {state == 7 && <Ledger/>}
            {state == 8 && <Goal/>}



        </div>
      
    </div>
  )
}

export default Demo
