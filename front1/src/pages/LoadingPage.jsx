import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import apiClient from "../apiClient.jsx";

function LoadingPage() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const sendReservationAndNavigate = async () => {
            setLoading(true);
            setError(null);

            try {
                const raw = window.opener?.sessionStorage?.getItem("reservationData");
                if(!raw) throw new Error("예약 정보가 없습니다.")

                const reservationData = JSON.parse(raw);

                const res = await apiClient.post("/api/reservation/select" ,reservationData);

                const key = res.data;
                console.log("✅ 받은 key:", key);

                setTimeout(() => {
                    navigate(`/select/${key}`);
                }, 2000);
            } catch (err) {
                console.error("❌ 예약 요청 실패:", err);
                setError("예약 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        sendReservationAndNavigate();
    }, [navigate]);

    return (
        <div style={{ textAlign: "center", padding: "100px" }}>
            <h2>로딩 중입니다...</h2>
            {loading && <p>예매 정보를 전송하고 있습니다</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export default LoadingPage;
