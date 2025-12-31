import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router'
import { getAllCategories,getAllExpenses,getAllGoals,getAllIncomes,getAllLedgers } from '../Function';
import { login, setAllCateogries,setAllExpenses,setAllGoals,setAllIncomes,setAllLedgers } from '../Redux/AuthRedux';



const OauthSuccess = () => {

     const navigate = useNavigate();
     const dispatch = useDispatch();
     const [searchParams] = useSearchParams();

     const token = searchParams.get("token");
     const email = searchParams.get("email");
     const name = searchParams.get("name");
     const message = searchParams.get("message");

    useEffect(() =>{

        if(!searchParams.toString()){

        navigate("/",{ replace: true })
        return;
        
        }

        if(!message) {
        setTimeout(()=>navigate("/"),4000);
        dispatch(login({token,email,name}));

          getAllCategories(token,dispatch,setAllCateogries);
          getAllExpenses(token,dispatch,setAllExpenses);
          getAllIncomes(token,dispatch,setAllIncomes);
          getAllGoals(token,dispatch,setAllGoals);
          getAllLedgers(token,dispatch,setAllLedgers);

        }

        else{

          setTimeout(() => navigate("/login"),4000);
        }

    },[])
  return (
  <div className='flex h-150  justify-center items-center'>
  
            <div className='w-90 p-12 rounded-lg shadow-[0_0_8px_gray] flex flex-col gap-6'>

           
          {message ? 
          
             <h1 className='text-2xl font-bold text-center'>lLogin Failed Email Already Exists Redirecting...</h1> 
             
                : 

            <h1 className='text-2xl font-bold text-center'>Successfully Login Redirecting...</h1>   
        }  
        
        
             </div>
    </div>
  )
}

export default OauthSuccess
