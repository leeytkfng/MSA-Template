import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import apiClient from "../../apiClient.jsx";
import "../../style/SelectSeat.css"

function SelectSeat() {
    const { key } = useParams();
    const navigate = useNavigate();

    const [reservationRequest, setReservationRequest] = useState(null);
    const [seats, setSeats] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [nonAvailable, setNonAvailable] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [requestRes, nonAvailableRes] = await Promise.all([
                    apiClient.get(`/api/reservation/select?key=${key}`),
                    apiClient.get(`/api/reservation/seat/status?key=${key}`)
                ]);

                console.log(requestRes, nonAvailableRes);

                setReservationRequest(requestRes.data);
                setNonAvailable(nonAvailableRes.data);

                const total = requestRes.data.reservationDTO.pAllSpot || 20;
                const seatPerRow = 10;
                const rowCount = Math.ceil(total/seatPerRow);
                const rows = Array.from({length: rowCount}, (_,i) =>
                String.fromCharCode("A".charCodeAt(0)+i))
                const generated = [];

                for (let i = 0; i < total; i++) {
                    const row = rows[Math.floor(i / 10)];
                    const num = (i % 10) + 1;
                    const id = `${row}${num}`;

                    generated.push({
                        id,
                        status: nonAvailableRes.data.includes(id) ? "nonAvailable" : "available"
                    });
                }

                setSeats(generated);
            } catch (e) {
                console.error("❌ 데이터 불러오기 실패:", e);
            }
        };

        if (key) fetchData();
    }, [key]);

    const toggleSeat = (id) => {
        const target = seats.find(seat => seat.id === id);
        if (target?.status === "nonAvailable") return; // 선택 불가

        setSelectedSeats(prev =>
            prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
        );
    };

    const goToConfirmPage = async () => {
        if (selectedSeats.length === 0) {
            alert("최소 1개 이상의 좌석을 선택해주세요.");
            return;
        }

        try {
            const params = new URLSearchParams();
            params.append("key", key);
            selectedSeats.forEach(seat => params.append("rSpots", seat));

            await axios.post("http://localhost:9090/api/reservation/confirm", params);
            navigate(`/popup/confirm/${key}`);
        } catch (error) {
            console.error("❌ 예매 확정 중 오류:", error);
            alert("예매 확정 중 오류가 발생했습니다.");
        }
    };

    const formatDateInfo = (dateStr) => {
        const date = new Date(dateStr);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = days[date.getDay()];

        return `> 관람 일자 : ${year}년 ${month}월 ${day}일(${dayOfWeek}) 시간 : ${hours}시 ${minutes}분`;
    };

    return (
        <div className="seat-selection-wrapper">
            {reservationRequest ? (
                <>
                    {/* 좌측 영역 */}

                    <div className="left-panel">

                        {/* 좌석 선택 영역 */}
                        <div className="seat-grid-wrapper"
                             style={{backgroundImage: `url("/images/stage.jpg")`}}>
                            <div className="seat-grid">
                                {seats.map((seat) => (
                                    <button
                                        key={seat.id}
                                        className={`seat-btn ${selectedSeats.includes(seat.id) ? "selected" : ""}`}
                                        onClick={() => toggleSeat(seat.id)}
                                        disabled={seat.status === "nonAvailable"}
                                    >
                                        {seat.id}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 공연 정보 영역 */}
                        <div className="show-info-wrapper">
                            <div style={{ minHeight: "12px" }}></div>
                            <ul className="show-info">
                                <li>
                                    <strong>
                                        공연&lt;{reservationRequest.reservationDTO.pTitle}&gt;<span className="place-info"> | {reservationRequest.reservationDTO.pPlace}</span>
                                    </strong>
                                </li>
                                <li className="sub-info-text">{formatDateInfo(reservationRequest.reservationDTO.pDate)}</li>
                            </ul>
                        </div>
                    </div>

                    {/* 우측 영역 */}
                    <div className="right-panel">
                        <div className="selected-seat-box">
                            <h3>선택한 좌석:</h3>
                            <div className="selected-seat-table-wrapper-outer">
                                <div className="selected-seat-table-wrapper">
                                    <table className="selected-seat-table">
                                        <tbody>
                                        {selectedSeats.map((seat) => (
                                            <tr key={seat}>
                                                <td>{seat}</td>
                                                <td>일반석</td>
                                                <td>{reservationRequest.reservationDTO.pPrice.toLocaleString()}원</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        {/*  총 금액 텍스트 표시 */}
                        <div className="total-price-text">
                            {reservationRequest && selectedSeats.length > 0 ? (
                                <>
                                    총 결제금액 : {" "}
                                    {(reservationRequest.reservationDTO.pPrice * selectedSeats.length).toLocaleString()}원
                                </>
                            ) : (
                                "총 금액: 0원"
                            )}
                        </div>
                        <button className="btn-primary" onClick={goToConfirmPage}>예매하기</button>
                    </div>
                </>
            ) : (
                <p>좌석 정보를 불러오는 중...</p>
            )}
        </div>
    );
}

export default SelectSeat;