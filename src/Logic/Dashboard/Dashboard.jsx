import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Dashboard1 from "./Dashboard1";
import Dashboard2 from "./Dashboard2";
import Dashboard3 from "./Dashboard3";
import axios from "axios";
import baseUrl from "../../Config";


export default function Dashboard() {

  const[data,setData] = useState({});
  const[loading,setLoading] = useState(true);
  const token = useSelector((state) => state.auth.user.token);

  useEffect(() =>{

    const getData = async () => {


      try{

         const response = await axios.get(`${baseUrl}/getDashboardData`,{

          headers:{
            Authorization:`Bearer ${token}`
          }

         })

         console.log(response.data);
         setData(response.data);
      }

      catch(error){

        console.log(error);
      }

      finally{

        setLoading(false);
      }

    }

       getData();

  },[]);


  return (

    <div className="sm:ml-7 mt-7">

      <div className="text-2xl text-gray-800 font-bold ">Dashboard Data</div>

      {loading && <h1 className="text-lg text-gray-800 font-semibold text-center mt-5">DashBoard Data is loading</h1>}

      {!loading && <div>

        <Dashboard1 income={data?.totalIncome} expense={data?.totalExpense}/>
        <Dashboard2 transactionList={data?.transactionList} income={data?.totalIncome} expense={data?.totalExpense}/> 
        <Dashboard3 expenseList={data?.expenseList} incomeList={data?.incomeList}/>        
        
        </div>}

        
    </div>
    
  );
}
