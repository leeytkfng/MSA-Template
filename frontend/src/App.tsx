import './App.css'
import {Route, Routes} from "react-router-dom";
import Test1 from "./Pages/test1.tsx";
import {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./Pages/register.tsx";
import Validation from "./Pages/validation.tsx";

function App() {
    const [isLoggendIn, setIsLoggedIn] =useState(() => !!localStorage.getItem("token"));

  return (
    <Routes>
      <Route path="/" element={<Validation/>}/>
      <Route path= "/register" element={<Register/>} />
      <Route path= "/login" element={<Test1/>} />
    </Routes>
  )
}

export default App
