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
                const response = await apiClient.post("/api/reservation/select", {
                    uId: 2,
                    pId: 99,
                    rId: 101,
                    uName: "홍길동",
                    pTitle: "오페라의 유령",
                    pPlace: "예술의전당",
                    pDate: "2025-04-12T05:31",
                    pPrice: 120000,
                    pAllSpot: 20
                });

                const key = response.data;
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
