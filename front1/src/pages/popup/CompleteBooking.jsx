// ConfirmFinalPage.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../../apiClient.jsx";
import "./Complete.css"

function ConfirmFinalPage() {
    const { key } = useParams(); // Redis 또는 부모로부터 전달받은 key
    const navigate = useNavigate();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response
                    = await axios.get(`http://localhost:9090/api/reservation/confirm?key=${key}`);
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("❌ 예매 정보 불러오기 실패:", error);
            }
        };
        if (key) fetchData();
    }, [key]);

    const handleConfirm = async () => {
        try {
            const params = new URLSearchParams();
            params.append("key",key)

            await apiClient.post("/api/reservation/save",params);
            alert("✅ 예매가 확정되었습니다.");
            navigate("/");
        } catch (error) {
            console.error("❌ 예매 확정 실패:", error);
            alert("예매 확정 중 문제가 발생했습니다.");
        }
    };

    const handleCancel = async () => {
        try {
            await apiClient.delete(`/api/reservation/cancel?key=${key}`);
            alert("❌ 예매가 취소되었습니다.");
            navigate("/");
        } catch (error) {
            console.error("❌ 예매 취소 실패:", error);
            alert("예매 취소 중 문제가 발생했습니다.");
        }
    };

    if (!data) return <p>데이터를 불러오는 중...</p>;

    const { reservationDTO, rSpots } = data;

    return (
        <div className="complete-wrapper">
            <h2 className="complete-title">예매 최종 확인</h2>
            <div className="complete-section">
                <div className="complete-left">
                    <p className="complete-info-item"><span className="info-title">공연 제목:</span> <span className="info-value">{reservationDTO.pTitle}</span></p>
                    <p className="complete-info-item"><span className="info-title">장소:</span> <span className="info-value">{reservationDTO.pPlace}</span></p>
                    <p className="complete-info-item"><span className="info-title">날짜:</span> <span className="info-value">{reservationDTO.pDate}</span></p>
                    <p className="complete-info-item"><span className="info-title">가격:</span> <span className="info-value">{reservationDTO.pPrice}</span></p>
                </div>
                <div className="section-right">
                    <p className="complete-info-item"><span className="info-title">좌석:</span> <span className="info-value">{rSpots.join(", ")}</span></p>
                    <p className="complete-info-item"><span className="info-title">예매자:</span> <span className="info-value">{reservationDTO.uName}</span></p>
                    <p className="complete-info-item"><span className="info-title">전화번호:</span> <span className="info-value">{reservationDTO.rPhone}</span></p>
                    <p className="complete-info-item"><span className="info-title">이메일:</span> <span className="info-value">{reservationDTO.rEmail}</span></p>
                </div>
            </div>

            <div className="button-group">
                <button className="complete-btn" onClick={handleConfirm}>✅ 예매 확정</button>
                <button className="cancel-btn" onClick={handleCancel}>❌ 예매 취소</button>
            </div>
        </div>
    );
}

export default ConfirmFinalPage;