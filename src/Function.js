import axios from 'axios';
import { formatDate } from './Date-Convert/DateEnglish';

const API_URL = "http://localhost:8080"; 

export const getAllExpenses = async (token,dispatch,setAllExpenses) => {
    try {
        const response = await axios.get(`${API_URL}/getAllExpenses`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        response.data.forEach((d) => d.date = formatDate(d.date))
        dispatch(setAllExpenses(response.data));

    } catch (error) {
        console.error("Failed to fetch expenses:", error);
        
    }
};

export const getAllCategories = async (token,dispatch,setAllCategories) => {
    try {
        const response = await axios.get(`${API_URL}/getAllCategory`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        dispatch(setAllCategories(response.data))
       
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        
    }
};

export const getAllIncomes = async (token,dispatch,setAllIncomes) => {
    try {
        const response = await axios.get(`${API_URL}/getAllIncomes`, {
            headers: { Authorization: `Bearer ${token}` }
        });

         response.data.forEach((d) => d.date = formatDate(d.date))
        dispatch(setAllIncomes(response.data))
       
    } catch (error) {
        console.error("Failed to fetch incomes:", error);
        
    }
};

export const getAllGoals = async (token,dispatch,setAllGoals) => {
    try {
        const response = await axios.get(`${API_URL}/getAllGoals`, {
            headers: { Authorization: `Bearer ${token}` }
        });

         response.data.forEach((d) => {
            
            d.startDate = formatDate(d.startDate)
            d.dueDate = formatDate(d.dueDate);
            
        
    })
        dispatch(setAllGoals(response.data))
       
    } catch (error) {
        console.error("Failed to fetch goals:", error);
        
    }
};

export const getAllLedgers = async (token,dispatch,setAllLedgers) => {
    try {
        const response = await axios.get(`${API_URL}/getAllLedgers`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        
        
         response.data.forEach((d) => d.date = formatDate(d.date))
        dispatch(setAllLedgers(response.data))
       
    } catch (error) {
        console.error("Failed to fetch ledgers:", error);
        
    }
};
