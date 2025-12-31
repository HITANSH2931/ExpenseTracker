import { Edit, Plus } from 'lucide-react'
import React, { useState } from 'react'
import CategoryModal from './CategoryModal';
import { useSelector } from 'react-redux';
import EditCategory from './EditCategory';
import BarGraph from './BarGraph';

const Category = () => {

    const[modal,setModal] = useState(false);
    const[edit,setEdit] = useState(false);
    const[value,setValue] = useState('');

    const categories = useSelector((state) => state.auth.category);
    
  return (
    <div className='mt-7 sm:ml-7'>

        <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold'>All Categories</h1>
            <button onClick={() =>setModal(true)} className='bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-3.5 py-1.5 text-[13px] flex items-center gap-1.5 font-bold'>
                <Plus className='w-4 h-4'/>Add Category</button>
        </div>

  
        {categories && <div className='p-5 rounded-lg bg-white mt-10'>

            <h1 className='text-[16px] font-bold'>Cateogry Sources</h1>

            {categories.length == 0 && <h1 className='bg-gray-4 text-[14px] text-gray-600 font-semibold mt-5'>No category added yet Click on Add category to get started</h1>}

            
            <div className='grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 gap-y-4 mt-5'>

            {categories.map((cat,index) =>(

                <div className='flex justify-between items-center px-2.5 py-2 hover:rounded-lg hover:bg-gray-100 group'>
                   
                    <div className='flex gap-3 items-center'>
                    <span className='text-xl bg-pink-50 rounded-full p-0.5'>{cat.emoji}</span>

                    <div className='flex flex-col gap-0.5 '>
                    <h1 className='text-[14px] font-semibold'>{cat.name}</h1>
                    <h2 className='text-[11px]'>{cat.type}</h2>
                    </div>
                    </div>

                   
                    <Edit onClick={() => {setEdit(true); setValue(cat)}} className='w-4 h-4 opacity-0 group-hover:opacity-100 text-blue-700'/> 

                </div> 
                
                  
            ))}
                
         </div> 
         </div>
          }
       
        {modal && <CategoryModal setModal={setModal}/>}

        {edit && <EditCategory value={value} setEdit={setEdit}/>}

        <BarGraph/>
      
    </div>
  )
}

export default Category
