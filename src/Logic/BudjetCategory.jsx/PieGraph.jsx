import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#c10007","#008236"];

const PieGraph = ({budjet,spend}) => {

   const data = spend < budjet ? [{name:"Spend",value:spend},{name:"Remaining",value:budjet-spend}] :
                                 [{name:"Exceeded",value:spend-budjet},{name:"Budjet", value:budjet}]; 
                                
                               console.log(data);  


  return (
    <div style={{ width: "100%", height: 300 }}>

   {spend < budjet && <p className="text-green-700 font-bold text-center">₹{budjet-spend} remaining</p>}

   {spend >= budjet &&  <p className="text-red-700 font-bold text-center">Budjet exceeded by ₹{spend-budjet}</p>}

       
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"       
            cy="50%"     
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

    
    </div>
  );
}
export default PieGraph;