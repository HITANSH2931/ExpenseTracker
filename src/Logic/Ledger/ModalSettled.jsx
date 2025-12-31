import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { formatDate } from '../../Date-Convert/DateEnglish';
import { updateLedger } from '../../Redux/AuthRedux';
import baseUrl from '../../Config';

const ModalSettled = ({setOpenModal,l}) => {

    const{register,handleSubmit,formState:{errors},reset} = useForm({mode:'onChange'});
    const[send,setSend] = useState(false);
    const token = useSelector((state) => state.auth.user.token);
    const dispatch = useDispatch();


    const SubmitForm =  async (data) =>{

        console.log(data);

        setSend(true);

        try{

            const response = await axios.put(`${baseUrl}/updateLedger`,{},
             
            {

                headers:{
                    Authorization:`Bearer ${token}`
                },
                params:{
                    id:l.id,
                    amount:data.amount
                }
            })
            
            response.data.date = formatDate(response.data.date);
            console.log(response.data)
            dispatch(updateLedger(response.data));
        

            toast.info("Ledger updated Successfully",{
                className:'text-[14px] text-gray-700 font-semibold rounded-lg'
            });
        }

        catch(error){

            console.log(error);
        }

        finally{

            setSend(false);
            reset();
            setOpenModal(false);
        }


    }

  return (
      <div className='fixed inset-0 flex justify-center items-center backdrop-blur-md'>

        <form onSubmit={handleSubmit(SubmitForm)} className='bg-white rounded-lg p-8 w-[360px] flex flex-col gap-8'>
    
        <div className='flex justify-between items-center'>
         <h1 className='text-xl font-bold text-center'>{l.ledgerType === "LENT" ? 'Receive Amount' : 'Pay Amount'}</h1>
         <X  onClick={() => setOpenModal(false)} className='w-5 h-5  hover:bg-black hover:text-white hover:rounded-full '/>

         </div>

         
                <div className='flex flex-col gap-1.5'>
                <h1 className='text-[13px] font-bold'>{l.ledgerType === "LENT" ? 'Enter Amoutn Received' : 'Enter Amount to Pay'}</h1>

                <input type='text' className='text-[13px] px-2.5 py-1.5 rounded-lg border border-gray-200 focus:outline-none w-full'
                {...register('amount',{required:'Amount is Required',validate:(value) => {
                if (isNaN(value)) return 'Only numbers are allowed';
                if (parseFloat(value) <= 0) return 'Amount must be greater than 0';
                const digits = value.replace('.', '');
                if (digits.length > 15) return 'Amount cannot exceed 15 digits';
                if(value > (l.amount-l.settledAmount)) return 'Pleaser Enter Valid Remaining amount';
                 return true;
      }})}
                />

               {errors.amount && <p className='text-[12px] text-red-600 font-semibold pl-1'>{errors.amount.message}</p>}

            </div>


            <button disabled={send} className={`${send ? 'bg-gray-400 hover:bg-gray-500 cursor-not-allowed' : 'bg-blue-600'}  text-white px-2.5 py-1.5 rounded-lg text-[14px] hover:bg-blue-700 font-semibold`}>Submit</button>

        </form>
      
    </div>
  )
}

export default ModalSettled
