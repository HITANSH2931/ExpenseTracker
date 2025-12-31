import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


const LedgerPieChart = ({amount,settledamount}) => {

    const COLORS = ["#a65f00", "#008236","#c10007"];

    const data = [

        {name:'Amount',value:amount},
        {name:'Settled Amount', value:settledamount},
        {name:'Remaining Amount',value:amount-settledamount}
    ]

  return (
    <div style={{ width: "100%", height: 300 }} className="mt-5">
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
          <Legend/>
        </PieChart>
      </ResponsiveContainer>


    
      
    </div>
  );
}
export default LedgerPieChart;