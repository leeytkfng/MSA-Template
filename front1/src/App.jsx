import './App.css';
import Header from "./pages/header.jsx";
import {Route, Routes, useLocation} from "react-router-dom";
import Register from "./components/register.jsx";
import Login from "./components/Login.jsx";
import Main1 from "./pages/main1.jsx";
import Footer from "./pages/Footer.jsx";

function App() {
    const location = useLocation();
    const hideLayout = ["/login", "/register"].includes(location.pathname);

    return (
        <div>
            {!hideLayout && <Header />}

            <Routes>
                <Route path="/" element={<Main1 />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>

            {!hideLayout && <Footer />}
        </div>
    );
}

export default App;
