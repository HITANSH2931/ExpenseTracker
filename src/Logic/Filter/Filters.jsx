import React from 'react'
import Filter1 from './Filter1'
import Filter2 from './Filter2';
import { useState } from 'react';

const Filters = () => {

   const[transactionData,setTransactionData] = useState([]);
   const[send,setSend] = useState(false);
  

  return (
    <div className='text-xl font-bold sm:ml-7 mt-7'>
      Filter Transactions

      <Filter1 setTransactionData={setTransactionData} setSend={setSend} send={send}/>
      <Filter2 transactionData={transactionData} send={send}/>
    </div>
  )
}

export default Filters
