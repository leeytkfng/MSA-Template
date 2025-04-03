import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
import apiClient from "../apiClient.tsx";

interface DecodedToken {
    sub: string;
    exp: number;
    iat: number;
}


const validation = () =>{
    const [email, setEmail] = useState<String | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            try {
                const decoded = jwtDecode<DecodedToken>(token);
                setEmail(decoded.sub);
            } catch (e:any){
                console.error("토큰 디코딩 실패");
                setEmail(null)
            }
        }
    }, []);

    const handleLogout = ()  =>{
        localStorage.removeItem("token");
        setEmail(null);
        alert("로그아웃되었습니다.");
        navigate("/");
    }
    const checkLogin = async () => {
        const res = await apiClient.get("/api/check/me", {
            email,
        });
        console.log("유저 이메일: " ,res.data);
    }

    const goToLogin = () => navigate("/login");
    const goToRegister = () => navigate("/register");

    return (
        <div className="container mt-5">
            <h3>로그인 상태 확인</h3>
            {email ? (
                <>
                    <p><strong>이메일:</strong> {email}</p>
                    <button className="btn btn-danger w-100 mb-2" onClick={handleLogout}>
                        로그아웃
                    </button>
                    <button className="btn btn-danger w-100 mb-2" onClick={checkLogin}>
                        로그인 확인 (Redis)
                    </button>
                </>

            ) : (
                <>
                    <p>로그인된 사용자가 없습니다.</p>
                    <button className="btn btn-primary w-100 mb-2" onClick={goToLogin}>
                        로그인 페이지로
                    </button>
                    <button className="btn btn-outline-secondary w-100" onClick={goToRegister}>
                        회원가입 하러 가기
                    </button>
                </>
            )}
        </div>
    );
}

export default validation;