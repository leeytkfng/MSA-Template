import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const formData = new FormData();
            formData.append("email", email);
            formData.append("password", password);
            formData.append("name", name);

            const res = await apiClient.post('/api/users/register', formData);
            alert("회원가입 성공!");
            navigate('/');
        } catch (err: any) {
            console.error("회원가입 오류:", err);
            setError("회원가입 실패: 이미 존재하는 사용자거나 서버 오류입니다.");
        }
    };

    const goToLogin = () => {
        navigate('/');
    };

    return (
        <div className="container mt-5" style={{ maxWidth: '450px' }}>
            <h3 className="mb-4">회원가입</h3>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="mb-3">
                <label className="form-label">이름</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

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

            <button className="btn btn-success w-100" onClick={handleRegister}>
                회원가입
            </button>

            <button className="btn btn-outline-secondary w-100 mt-3" onClick={goToLogin}>
                로그인으로 돌아가기
            </button>
        </div>
    );
};

export default RegisterPage;
