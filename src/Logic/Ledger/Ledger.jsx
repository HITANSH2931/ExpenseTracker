import { Circle, Plus } from 'lucide-react'
import React, { useState } from 'react'
import LedgerModal from './LedgerModal';
import { useSelector } from 'react-redux';
import LedgerPieChart from './LedgerPieChart';
import ModalSettled from './ModalSettled';

const Ledger = () => {

    const[openModal,setModal]  = useState(false);
    const[modal,setOpenModal] = useState(false);
    const ledgers = useSelector((state) => state.auth.ledger)
    const[ledger,setLedger] = useState({});

  return (
    <div className='sm:ml-7 mt-7'>

        <div className='flex items-center justify-between'>
        
        <div className='flex flex-col gap-2.5'>
        <h1 className='text-xl font-bold'>Track Your Money Lent or Borrowed</h1>
        <p className='text-gray-800 font-semibold text-[14px]'>Never lose track of money you’ve lent or borrowed.</p>
        </div>

         <button onClick={() =>setModal(true)} className='bg-green-100 hover:bg-green-200 text-green-800 rounded-lg px-3.5 py-1.5 text-[13px] flex items-center gap-1.5 font-bold'>
               <Plus className='w-4 h-4'/>Add Ledger</button>
    
        </div>

        {ledgers.length == 0 && <p className='text-[15px] font-semibold text-gray-800 mt-5'>No Ledger added yet</p>}

        <div className='grid grid-cols-1 gap-y-5 mt-10'>

        {ledgers.map((l,index) => (

            <div className=' grid grid-cols-1 sm:grid-cols-2'>

            <div className='bg-white hover:bg-gray-100 rounded-lg px-2.5 py-3.5 flex items-center justify-between'>

            <div>
                <h1 className='font-bold text-[15px]'>{l.name}</h1>
                <p className='font-semibold text-gray-700 text-[14px]'>{l.description}</p>
                <p className='text-[13px] text-gray-700 font-semibold'>Amount : {l.amount}</p>
                <p className='text-[13px] text-gray-700 font-semibold'>{l.date}</p>
            </div>


            <div className='flex flex-col items-center'>
                <Circle fill={l.ledgerStatus == "PENDING" ? 'red' : l.ledgerStatus == "SETTLED" ? 'green' : 'yellow'}/>
                <span className='text-gray-700 font-bold text-[13px]'>{l.ledgerStatus}</span>
            </div> 

            <button disabled={l.ledgerStatus==="SETTLED"} onClick={() => {setOpenModal(true); setLedger(l);}} className={`text-[14px] ${l.ledgerStatus==="SETTLED" ? 'cursor-not-allowed bg-gray-400 hover:bg-gray-500 text-white' : 'bg-green-200 hover:bg-green-300 text-green-600 '}  font-semibold  px-3.5 py-1.5 rounded-lg`}>{l.ledgerType === "LENT" ? 'Receive' : 'Pay'}</button>   


            </div> 

            <div>

                <LedgerPieChart amount={l.amount} settledamount={l.settledAmount}/>
        
             </div> 

            </div> 
        ))}

        </div>

        {openModal && <LedgerModal setModal={setModal}/>}
        {modal && <ModalSettled setOpenModal={setOpenModal} l={ledger}/>}

        </div>
      
  )
}

export default Ledger
