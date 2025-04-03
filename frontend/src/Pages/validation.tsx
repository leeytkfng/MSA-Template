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
    const [email2, setEmail2] = useState('');
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

    const handleLogout = async ()  =>{
        try {
           const token = localStorage.getItem("token");
           if (token) {
               await apiClient.post("/api/users/logout" ,null, {
                   headers: {
                       Authorization: `Bearer ${token}`
                   }
               });
           }
            localStorage.removeItem("token");
            setEmail(null);
            alert("로그아웃되었습니다.");
            navigate("/");
        } catch (err) {
            console.log("로그아웃중 오류:", err);
        }

    }
    const checkLogin = async () => {
        const res = await apiClient.get("/api/performances/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        setEmail2(res.data.email);
        console.log("유저 이메일: " ,res.data);
    }

    const goToLogin = () => navigate("/login");
    const goToRegister = () => navigate("/register");

    return (
        <div className="container mt-5">
            <h3>로그인 상태 확인</h3>
            {email ? (
                <>
                    <p><strong>디코딩된 이메일:</strong> {email}</p>
                    {email2 && <p><strong>Redis 확인 이메일:</strong> {email2}</p>}
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