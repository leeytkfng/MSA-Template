import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../apiClient";
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationPassword, setValidationPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [authCode, setAuthCode] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const navigate = useNavigate();

    const handleSendAuthCode = async () => {
        try {
            const response = await apiClient.post("/api/users/send-code", { email });
            alert("인증번호가 이메일로 발송되었습니다.");
        } catch (err: any) {
            alert("인증번호 전송 실패!");
        }
    };

    const handleVerifyAuthCode = async () => {
        try {
            const response = await apiClient.post("/api/users/verify-code" ,{
                email,
                code: authCode,
            });
            alert("이메일 검증완료");
            setEmailVerified(true);
        } catch (err :any) {
            alert("인증번호가 틀렸습니다.");
        }
    };

    const handleRegister = async () => {
        if (!emailVerified) {
            setError("이메일 인증을 완료해주세요.");
            return;
        }
        if (!email.trim() || !password.trim() || !validationPassword.trim() || !name.trim()) {
            setError("모든 필드를 입력해주세요.");
            return;
        }

        if (password !== validationPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

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
                    disabled={emailVerified}
                />
                <button className= "btn btn-outline-primary mt-3"
                        onClick={handleSendAuthCode}
                        disabled={emailVerified}
                    >인증요청</button>
            </div>

            {!emailVerified && (
                <div className="mb-3">
                    <label className="form-label">인증번호 입력</label>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            value={authCode}
                            onChange={(e) => setAuthCode(e.target.value)}
                        />
                        <button className="btn btn-outline-success" onClick={handleVerifyAuthCode}>
                            인증 확인
                        </button>
                    </div>
                </div>
            )}

            <div className="mb-3">
                <label className="form-label">비밀번호</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">비밀번호 확인</label>
                <input
                    type="password"
                    className="form-control"
                    value={validationPassword}
                    onChange={(e) => setValidationPassword(e.target.value)}
                />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}


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
