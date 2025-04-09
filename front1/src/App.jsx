import './App.css';
import Header from "./pages/header.jsx";
import {Route, Routes, useLocation} from "react-router-dom";
import Register from "./components/register.jsx";
import Login from "./components/Login.jsx";
import Main1 from "./pages/main1.jsx";
import Footer from "./pages/Footer.jsx";
import MyPage from "./pages/MyPage.jsx";
import PerformanceDetail from "./pages/PerformanceDetail.jsx";

function App() {
    const location = useLocation();
    const hideLayout = ["/login", "/register"].includes(location.pathname);

    return (
        <div className="app-container">
            {!hideLayout && <Header />}
            {/* 로그인/회원가입은 따로 */}
            {hideLayout ? (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            ) : (
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Main1 />} />
                        <Route path="/mypage" element={<MyPage/>} />
                        <Route path="/performances/:pId" element={<PerformanceDetail/>} />
                        {/* 기타 일반 페이지들 */}
                    </Routes>
                    <Footer />
                </div>
            )}
        </div>
    );
}

export default App;
