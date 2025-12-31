import React from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";



const BarGraph = () => {

   const expenses = useSelector((state) => state.auth.expense);
   const data = expenses.reduce((acc,curr) =>{

       const{name,expense} = curr;
       acc[name] = (acc[name] || 0) + expense;
       return acc;
   },{})

   const chartData = Object.entries(data).map(([name, value]) => ({
   name,
   spend:value,
  }));


  
  return (
    <div style={{ width: "100%", height: 400 }} className="bg-white p-4 rounded-lg mt-10 flex flex-col gap-14">

      <h1 className="text-lg font-bold">Highlighting Maximum Expense</h1>

      {expenses.length == 0 && <p className="text-[15px] font-semibold text-gray-800">No Expense have been created yet</p>}
      {expenses.length !=0 && <ResponsiveContainer>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name"  tickLine={false}/>
          <YAxis dataKey="spend" tickLine={false}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="spend" fill="#8b5cf6" name="Spent" />
        </BarChart>
      </ResponsiveContainer>}
    </div>
  );
};

export default BarGraph;
