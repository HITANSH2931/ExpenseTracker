import { GalleryHorizontal, Icon, X } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Emoji from '../Emoji';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { editCategory } from '../../Redux/AuthRedux';
import { toast } from 'react-toastify';
import baseUrl from '../../Config';



const EditCategory = ({setEdit,value}) => {
    
    const{register,handleSubmit,formState:{errors},reset} = useForm({mode:'onChange',defaultValues:{...value}});
    const[emoji,setOpenEmoji] = useState(false);
    const[icon,setIcon] = useState({emoji:value.emoji});
    const token = useSelector((state) => state.auth.user.token);
    const[send,setSend] = useState(false);
    const dispatch = useDispatch();
    const[data,setData] = useState('');

    console.log(icon)

    const SubmitForm =  async (data) =>{

       console.log(data);

       setSend(true);

       try{

          const response = await axios.post(`${baseUrl}/editCategory`,{
            ...data,emoji:icon.emoji
          },

          {

            headers:{
                Authorization:`Bearer ${token}`
            }
          }
        
        
    )

      console.log(response.data);
      dispatch(editCategory(response.data))

       toast.info("Category edited Successfully",{
                      className:'text-[14px] text-gray-700 font-semibold rounded-lg'
                  });
        
       }

       catch(error){

        console.log(error)
          toast.warn("Category name already exists",{
                              className:'text-[14px] text-gray-700 font-semibold rounded-lg'
                          });
        
      
       
       }

       finally{

          setSend(false);
          setEdit(false);
       }


    }

  return (
    <div className='fixed inset-0 flex justify-center items-center backdrop-blur-md z-50'>

        <form onSubmit={handleSubmit(SubmitForm)} className='bg-white rounded-lg p-8 w-[360px] flex flex-col gap-8'>
    
        <div className='flex justify-between items-center'>
         <h1 className='text-xl font-bold text-center'>Update Category</h1>
         <X  onClick={() => setEdit(false)} className='w-5 h-5  hover:bg-black hover:text-white hover:rounded-full '/>

         </div>

      

         {!emoji && <div onClick={() => setOpenEmoji(true)} className='flex flex-col items-center gap-1.5'>

            <div className='flex items-center gap-1.5'> 
            <span>{icon.emoji}</span>
            <h1 className='text-[15px] font-bold'>Change Icon</h1>
            </div>
           
          
         </div>}

         
           {emoji && <Emoji setIcon={setIcon} setOpenEmoji={setOpenEmoji}/>}
        

         <div className='flex flex-col gap-1'>

                <h1 className='text-[13px] font-bold'>Category Name</h1>
                <input type='text' placeholder='Freelance,Salary, Groceries' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none'
                {...register('name',{required:'Name is Required'})}
                />

               {errors.name && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.name.message}</p>}

            </div>

             <div className='flex flex-col gap-1'>
                <h1 className='text-[13px] font-bold'>Category Type</h1>

                <select className='border border-solid border-gray-200 rounded-lg px-2.5 py-1.5 text-[13px] focus:outline-none' defaultValue="" 
                 {...register('type',{required:'Category Type is Required'})}
                >
                    <option value="" disabled>Choose Category</option>
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                </select>

                  {errors.type && <p className='text-[12px] text-red-600  font-semibold pl-1'>{errors.type.message}</p>}

                
            </div>

            <button disabled={send} className={`${send ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-blue-600'}  text-white px-2.5 py-1.5 rounded-lg text-[14px] hover:bg-blue-700 font-semibold`}>Submit</button>

        </form>
      
    </div>
  )
}

export default EditCategory
