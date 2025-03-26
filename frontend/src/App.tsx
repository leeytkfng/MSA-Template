import './App.css'
import {Route, Routes} from "react-router-dom";
import Test1 from "./Pages/test1.tsx";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Test1/>}/>
    </Routes>
  )
}

export default App
