import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../../apiClient.jsx";
import "./confirm.css"
function ConfirmPage() {
    const { key } = useParams(); // URL 파라미터로부터 key 받기
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [rPhone, setRPhone] = useState("");
    const [rEmail, setREmail] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get(`/api/reservation/confirm?key=${key}`);
                setData(response.data);
                setRPhone(response.data.reservationDTO.rPhone);
                setREmail(response.data.reservationDTO.rEmail);
            } catch (error) {
                console.error("❌ 예매 확인 중 오류:", error);
            }
        };

        if (key) fetchData();
    }, [key]);

    const handleComplete = async () => {
        if (!rPhone || !rEmail) {
            alert("전화번호와 이메일을 모두 입력해주세요.");
            return;
        }
    
        try {
            const params = new URLSearchParams();
            params.append("key", key);
            params.append("rPhone", rPhone);
            params.append("rEmail", rEmail);
    
            // 백엔드로 예약 완료 확인 요청
            await apiClient.post("/api/reservation/complete", params);

            navigate(`/popup/complete/${key}`);
        } catch (error) {
            console.error("❌ 예매 완료 중 오류:", error);
            alert("예매 완료 중 오류가 발생했습니다.");
        }
    };
    

    if (!key) return <p>잘못된 접근입니다. key가 없습니다.</p>;
    if (!data) return <p>데이터를 불러오는 중...</p>;

    const { reservationDTO, rSpots } = data;

    return (
        <div className="reservation-wrapper">
            {/* 왼쪽 영역 - 사용자 정보 */}
            <div className="reservation-left">
                <div className="info-row-wrapper">
                    <h2>예매자 정보 입력</h2>

                    {/* 예매자 이름 (출력용) */}
                    <div className="info-row horizontal">
                        <label className="row-lable">예매자</label>
                        <span className="viewer-name">{reservationDTO.uName}</span>
                    </div>

                    {/* 전화번호 입력 */}
                    <div className="info-row horizontal">
                        <label className="row-lable">전화번호</label>
                        <input
                            type="text"
                            value={rPhone}
                            onChange={(e) => setRPhone(e.target.value)}
                        />
                    </div>

                    {/* 이메일 입력 */}
                    <div className="info-row horizontal">
                        <label className="row-lable">이메일</label>
                        <input
                            type="text"
                            value={rEmail}
                            onChange={(e) => setREmail(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* 오른쪽 영역 - 공연 정보 + 버튼 */}
            <div className="reservation-right">
                <h2>예매 정보 확인</h2>
                <div className="info-list-wrapper">
                    <ul className="info-list">
                        <li><strong>공연 제목:</strong> {reservationDTO.pTitle}</li>
                        <li><strong>장소:</strong> {reservationDTO.pPlace}</li>
                        <li><strong>날짜:</strong> {reservationDTO.pDate}</li>
                        <li>
                            <strong>가격:</strong> {Number(reservationDTO.pPrice) * rSpots.length}원
                            <span className="price-details">
                  ({reservationDTO.pPrice}원 × {rSpots.length})
                </span>
                        </li>
                        <li><strong>선택한 좌석:</strong> {rSpots.join(", ")}</li>
                    </ul>
                </div>
                <button className="confirm-btn" onClick={handleComplete}>예매 완료</button>
            </div>
        </div>




    );
}

export default ConfirmPage;
