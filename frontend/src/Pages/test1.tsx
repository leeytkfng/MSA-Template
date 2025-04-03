import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import apiClient from "../apiClient.tsx";


const test1 = () =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () =>{
        try {
            const res = await apiClient.post('/api/users/login', {
                email,
                password
            });
            const token = res.data;
            localStorage.setItem("token",token);
            alert('로그인 성공');
            navigate('/');
        } catch (err:any) {
            console.error("로그인 오류:" + err);
        }
    }

    const goToResister = () =>{
        navigate('/register');
    }


    return (<div className="container mt-5" style={{ maxWidth: '400px' }}>
            <h3 className="mb-4">로그인</h3>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <label className="form-label">이메일</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">비밀번호</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button className="btn btn-primary w-100" onClick={handleLogin}>
                로그인
            </button>

            <button className="btn btn-outline-secondary w-100 mt-3" onClick={goToResister}>
                회원가입 하러 가기
            </button>
        </div>
    );
};

export default test1;