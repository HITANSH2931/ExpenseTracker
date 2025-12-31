import Home from "./Home/Home";
import SignUp from "./Auth/SignUp";
import NavBar from "./NavBar";
import { Routes,Route } from "react-router-dom";
import Login from "./Auth/Login";
import Verify from "./Auth/Verify";
import OauthSuccess from "./Auth/OauthSuccess";
import Demo from "./Logic/Demo";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export default function App() {
  return (

    <div>

      <NavBar/>

    <Routes>
       
         <Route path="/" element={<Home/>} />

         <Route element={<PublicRoute/>}>
         <Route path="/signUp" element={<SignUp/>} />
         <Route path="/login" element={<Login/>}/>
         <Route path="/oauthSuccess" element={<OauthSuccess/>}/>
         </Route>

         <Route element={<PrivateRoute/>}>
         <Route path="demo" element={<Demo/>}/>
        </Route>
       
        
    </Routes>

    </div>

  );
}
