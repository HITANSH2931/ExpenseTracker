import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = ({ data }) => {
  return (
    
    <div style={{ width: "95%", height: 320 }} className="mt-12">
      <ResponsiveContainer>
        <LineChart data={data} margin={{left:30,bottom:10}} >
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fontSize:14,fontWeight:600,fill:'#000000'}} tickMargin={15} />
          <YAxis dataKey="expense" axisLine={false} tickLine={false} tick={{fontSize:14,fontWeight:600,fill:'#000000'}} tickFormatter={(value) => `₹${value}`} tickMargin={15} />
          <Tooltip />
          <Line type="monotone" dataKey="expense" name="Expense" stroke="#7c3aed" />
        </LineChart>
      </ResponsiveContainer>
    </div>
    
  );
};

export default LineChartComponent;
