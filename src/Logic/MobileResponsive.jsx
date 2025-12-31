import { Filter, Layers, LayoutDashboard, PiggyBank, TrendingDown, User, Wallet,HandCoins, Target } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'




const MobileResponsive = ({state,setState,setOpen}) => {

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

     const name = useSelector((state) => state.auth.user.username)

  return (

    <div className='flex flex-col gap-y-7  items-center mt-16'>

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
  )
}

export default MobileResponsive
