import { createSlice } from '@reduxjs/toolkit'

const auth = localStorage.getItem("auth2.0");
const parsedAuth = auth ? JSON.parse(auth) : null;

const initialState = parsedAuth ||  {
   user:{},
   isAuthenticated:false,
   category:[],
   income:[],
   expense:[],
   ledger:[],
   goal:[]
}

const AuthRedux = createSlice({
  name: 'Auth',
  initialState,
  reducers: {

    signUp:(state,action) =>{

        state.user = action.payload;
        localStorage.setItem("auth2.0",JSON.stringify(state))
    },

    login:(state,action) =>{

        state.user = action.payload;
        state.isAuthenticated=true;
        localStorage.setItem("auth2.0",JSON.stringify(state))

    },
    addCategory:(state,action) =>{
        
      state.category.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))


    },
    editCategory:(state,action) =>{

      state.category = state.category.filter((c) => c.id != action.payload.id);
      state.category.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    addIncome:(state,action) =>{

      state.income.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    deleteIncome:(state,action) =>{

       state.income = state.income.filter((i) => i.id != action.payload.id);
       localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    editIncome:(state,action) =>{

      state.income = state.income.filter((i) => i.id != action.payload.id);
      state.income.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))


    },
     addExpense:(state,action) =>{

      state.expense.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    deleteExpense:(state,action) =>{

       state.expense = state.expense.filter((e) => e.id != action.payload.id);
       localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    editExpense:(state,action) =>{

      state.expense = state.expense.filter((e) => e.id != action.payload.id);
      state.expense.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    addLedger:(state,action) =>{

      state.ledger.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    updateLedger:(state,action) =>{

      state.ledger = state.ledger.filter((l) => l.id != action.payload.id);
      state.ledger.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    addGoal:(state,action) =>{

      state.goal.push(action.payload);
      localStorage.setItem("auth2.0",JSON.stringify(state))

    },

    updateGoal:(state,action) =>{

      state.goal = state.goal.filter((g) => !action.payload.some((c) => c.id == g.id));
      
      action.payload.forEach((g) => state.goal.push(g))

      localStorage.setItem("auth2.0",JSON.stringify(state))
      

    },

    setAllExpenses:(state,action) =>{

      state.expense = action.payload;
      localStorage.setItem("auth2.0",JSON.stringify(state))
    },

    setAllIncomes:(state,action) =>{

      state.income = action.payload;
      localStorage.setItem("auth2.0",JSON.stringify(state))
    },

    setAllCateogries:(state,action) =>{

      state.category = action.payload;
      localStorage.setItem("auth2.0",JSON.stringify(state))
    },

    setAllLedgers:(state,action) =>{

      state.ledger = action.payload;
      localStorage.setItem("auth2.0",JSON.stringify(state))
    },

    setAllGoals:(state,action) =>{

      state.goal = action.payload;
      localStorage.setItem("auth2.0",JSON.stringify(state))
    },

    logout:(state) =>{

      state.user = {},
      state.isAuthenticated=false;
      state.category=[];
      state.income=[];
      state.expense=[];
      state.ledger=[];
      state.goal=[];
      localStorage.removeItem("auth2.0");


    }


     
  },
})

export const {signUp,login,logout,addCategory,editCategory,addIncome,deleteIncome,editIncome,addExpense,
             editExpense,deleteExpense,addLedger,updateLedger,addGoal,updateGoal,
              setAllExpenses,setAllCateogries,setAllGoals,setAllIncomes,setAllLedgers} = AuthRedux.actions
export default AuthRedux.reducer
