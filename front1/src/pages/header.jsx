import React, { useEffect, useState } from 'react';
import '../style/Header.css';
import { useNavigate, useLocation } from "react-router-dom";
import {useSelector} from "react-redux";

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userEmail, setUserEmail] = useState(null);

    const {isLoggedIn, email} = useSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const email = localStorage.getItem("email");

        if (token && email) {
            setUserEmail(email);
        } else {
            setUserEmail(null);
        }
    }, [location]); // ✅ 경로가 바뀔 때마다 다시 확인!

    const goMain = () => navigate("/");
    const goToMypage = () => navigate("/mypage");
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("userInfo");
        alert("로그아웃 되었습니다");
        window.location.reload(); // 강제 리렌더링 (선택사항)
    };

    return (
        <header className="header">
            <div className="top-menu">
                <div onClick={goMain} className="logo" style={{ cursor: "pointer" }}>
                    <span>Interpark</span>
                </div>

                <div className="search-container">
                    <input type="text" placeholder="이제 NOL 인터파크로 떠나요!" />
                </div>

                <div className="auth-links">
                    {isLoggedIn ? (
                        <>
                            <a href="#" onClick={goToMypage}>마이페이지</a>
                            <a href="#" onClick={handleLogout}>로그아웃</a>
                        </>
                    ) : (
                        <>
                            <a href="/login">로그인</a>
                            <a href="/register">회원가입</a>
                        </>
                    )}
                </div>
            </div>

            <div className="bottom-menu">
                <a href="/home">홈</a>
                <a href="/tour">투어</a>
                <a href="/ticket">티켓</a>
                <a href="/coupons">공연</a>
                <a href="/domestic-coupons">이벤트</a>
            </div>
        </header>
    );
}

export default Header;
