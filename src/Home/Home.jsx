import React from 'react'
import { BarChart3, ShieldCheck, Mail, Wallet, PieChart, Lock } from "lucide-react";
import { User, Plus, BarChart2 } from "lucide-react";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Home = () => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const handleClick = () =>{

      if(isAuthenticated) navigate("/demo")
      else navigate("/signUp")
  }

  return (
    <div>   
      <section id="home" className=' text-white py-20'>
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
          <div className="text-purple-700">
            <h1 className="  text-4xl md:text-5xl font-bold leading-tight">
              Track Every Rupee. <br /> Control Your Future.
            </h1>
            <p className="mt-4 text-lg opacity-90">
              Manage your expenses and budgets with ease.
            </p>

            <div className="mt-6 flex gap-4">
              <button onClick={() => handleClick()} className={`text-white ${isAuthenticated ? 'bg-purple-500 hover:bg-purple-600 ' : 'bg-green-500 hover:bg-green-600'} px-6 py-3 rounded-lg font-semibold`}>
                 {!isAuthenticated ? 'Get Started – It’s Free' : 'DashBoard'}
              </button>
              <button onClick={() => navigate("/login")} className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold border-2 border-solid">
                Login
              </button>
              
            </div>
          </div>

           <div>
          <img src="dashboard.png" className="h-80 w-full"/>
        </div>

        </div>

       
      </section>

    
      <section  id="stats" className="py-12 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <Stat icon={<Wallet />} title="10,000+" desc="Expenses Tracked" />
          <Stat icon={<ShieldCheck />} title="Secure" desc="Encrypted Data" />
          <Stat icon={<Mail />} title="Email & OTP" desc="Verification" />
          <Stat icon={<Lock />} title="JWT Auth" desc="Protected Access" />
        </div>
      </section>

    
      <section id="benefits" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Expense Tracker?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <ul className="space-y-4 text-gray-600">
                <li>❌ Tedious manual tracking</li>
                <li>❌ Forgotten expenses</li>
                <li>❌ No budget control</li>
                <li>❌ Overspending without notice</li>
                <li>❌ Hard to track shared expenses</li>
                 <li>❌ No insights on spending trends</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl shadow">
              <ul className="space-y-4 text-green-700 font-semibold">
                <li>✅ Track income vs expenses</li>
                <li>✅ Insightful reports & charts</li>
                <li>✅ Set & track budgets</li>
                <li>✅ Export reports (PDF/CSV)</li>
                <li>✅ Maintain money ledger (lend & borrow)</li>
                <li>✅ Secure and private financial data</li>

              </ul>
            </div>
          </div>
        </div>
      </section>

     
      <section id="features" className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Features to Manage Your Money
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6">
            <Feature  img="expensetrack.png" title="Expense Tracking" desc="Add and categorize expenses easily." />
            <Feature img="analytics.png" title="Analytics" desc="Detailed charts & insights." />
            <Feature img="budget.png" title="Budget Planning" desc="Set & monitor budgets." />
            <Feature img="secure.png" title="Secure & Private" desc="JWT & OTP protected." />
            <Feature img="report.png" title="Generate Reports" desc="Easily create detailed financial reports to visualize your spending and income trends" />
           
          </div>
        </div>
      </section>

   
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <Step number="1" text="Sign Up & Verify Email" />
            <Step number="2" text="Add Your Expenses" />
            <Step number="3" text="Set Your Budget" />
            <Step number="4" text="Analyze & Save Money" />
          </div>
        </div>
      </section>

   


     
      <section className="bg-purple-600 text-white py-20 text-center">
        <h2 className="text-4xl font-bold">Take Control of Your Finances Today</h2>
        <p className="mt-4 text-lg">Join thousands who are saving smarter.</p>

        <div className="mt-6 flex justify-center gap-4">
          <button   onClick={() => handleClick()}  className={`${isAuthenticated ? 'bg-purple-500' : 'bg-green-500'} px-6 py-3 rounded-lg font-semibold`}>
            {!isAuthenticated ? 'Get Started – It’s Free' : 'DashBoard'}
          </button>
          <button onClick={() => navigate("/login")} className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold">
            Login
          </button>
        </div>
      </section>

     
      <footer className="bg-gray-900 text-gray-400 py-6 text-center">
        © 2025 Expense Tracker · Privacy · Terms · Contact
      </footer>
    </div>
    
  );
}



const Stat = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="text-purple-600">{icon}</div>
    <h3 className="font-bold">{title}</h3>
    <p className="text-sm">{desc}</p>
  </div>
);

const Feature = ({ img, title, desc }) => (
  <div className="bg-white p-6 rounded-xl shadow text-center flex flex-col gap-2">

    <img src={img} className="h-20 w-28 mx-auto"/>
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);

const Step = ({ number, text }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <div className="text-2xl font-bold text-purple-600 mb-2">{number}</div>
    <p className="font-semibold">{text}</p>
  </div>
      
    
  )


export default Home
