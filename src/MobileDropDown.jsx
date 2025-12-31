import React from 'react'
import { List } from 'lucide-react'

const MobileDropDown = () => {

  return (
    <div className='text-purple-700 group relative'>

         <List/>
        
          <div className='backdrop-blur-md  absolute top-full -left-7 mt-2 text-lg font-semibold rounded-lg border border-gray-300 px-3.5 py-2 text-purple-600 text-[15px] opacity-0 group-hover:opacity-100' >
       
           <ul className='flex flex-col gap-2 ' >
            <li className='hover:text-purple-700 hover:underline hover:pb-0.5'>
                <a href="#home">Home</a></li>
            <li className='hover:text-purple-700 hover:underline hover:pb-0.5'>
                <a href="#stats">Statistics</a></li>
            <li className='hover:text-purple-700 hover:underline hover:pb-0.5'>
                <a href="#benefits">Benefits</a></li>
            <li className='hover:text-purple-700 hover:underline hover:pb-0.5'>
                <a href="#features">Features</a></li>
           
           </ul>
                    
                 </div>
      
    </div>
  )
}

export default MobileDropDown
