import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import apiClient from "../apiClient.jsx";


function PerformanceDetail() {
    const { pId } = useParams(); // ✅ URL에서 pId 가져오기
    const [performance, setPerformance] = useState({});
    const token =localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        if (pId) {
            loadPerformance(pId);
        }
    }, [pId]);

    const loadPerformance = async (pId) => {
        try {
            const response = await apiClient.get(`api/performances/${pId}`);
            console.log("API 응답:", response.data);
            setPerformance(response.data);
        } catch (error) {
            console.error("공연 정보를 불러오는데 실패했습니다:", error);
        }
    };

    const deletePerformance = async (pId) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            try {
                await axios.delete(`http://localhost:9090/api/performances/${pId}`);
                loadPerformance(pId);
            } catch (error) {
                console.error("상품 삭제에 실패했습니다:", error);
            }
        }
    };

    const formatPerformanceTime = (timeStr) => {
        if (!timeStr) return "시간 정보 없음";

        const hours = timeStr.match(/(\d+)H/);
        const mins = timeStr.match(/(\d+)M/);

        if (hours && mins) return `${hours[1]}시간 ${mins[1]}분`;
        if (hours) return `${hours[1]}시간`;
        if (mins) return `${mins[1]}분`;
        return "시간 정보 없음";
    };

    const handleReservation = () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (userInfo) {
            console.log("유저 ID:", userInfo.id);
            console.log("이름:", userInfo.name);
        }


        const reservationData = {
            uId: userInfo.id,
            uName: userInfo.name,
            pId: performance.pid,
            pTitle: performance.ptitle,
            pPlace: performance.pplace,
            pDate: performance.pdate,
            pPrice: performance.pprice,
            pAllSpot: performance.pallSpot
        };

        sessionStorage.setItem("reservationData", JSON.stringify(reservationData));

        window.open(
            "/popup/loading",
            "popupWindow",
            "width=920,height=600,left=300,top=200,toolbar=no,menubar=no,scrollbars=no,resizable=no"
        );
    };



    return (
        <div className="container mx-auto p-10">
            {/* 기존 레이아웃 (이미지 + 공연 정보) */}
            <div className="bg-white rounded-lg  flex p-10">
                <div className="w-1/3 flex-shrink-0">
                    <img
                        src={`/images/${performance.pimg}`}
                        alt={performance.ptitle}
                        className="w-full h-auto object-cover rounded-lg shadow-md"
                    />
                </div>
                <div className="w-2/3 flex-grow pl-10 text-left space-y-6">
                    <h1 className="text-4xl font-extrabold text-gray-900">{performance.ptitle}</h1>
                    <p className="text-gray-600 text-lg leading-8">📌 장르: <span className="font-medium">{performance.pgenre}</span></p>
                    <p className="text-gray-600 text-lg leading-8">📌 담당자: <span className="font-medium">{performance.pmanager}</span></p>
                    <p className="text-2xl font-semibold text-blue-600 leading-9">💰 {performance.pprice}원</p>
                    <p className="text-gray-700 text-lg leading-8">📍 장소: <span className="font-medium">{performance.pplace}</span></p>
                    <p className="text-gray-700 text-lg leading-8"> 좌석: {performance.pspot}/{performance.pallSpot}</p>
                    <p className="text-gray-500 text-lg leading-8">📅 공연 날짜: {new Date(performance.pdate).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    }).replace(/\./g, "").replace(/(\d{4}) (\d{2}) (\d{2})/, "$1년 $2월 $3일")}</p>
                    <p className="text-gray-500 text-lg leading-8">
                        📅 공연 시간: {formatPerformanceTime(performance.performanceTime)}
                    </p>

                    {/* 🔥 예매 버튼 */}
                    <div className="mt-10 text-right">
                        <button className="w-full px-12 py-4 bg-purple-600 text-white text-xl font-bold rounded-lg shadow-lg hover:bg-purple-700 transition"
                                onClick={handleReservation}>
                            🎟️ 예매하기
                        </button>
                    </div>
                </div>
            </div>

            {/* 공연 상세 정보 */}
            <div className="mt-12 bg-gray-100 rounded-lg "
                 style={{padding:"10px"}}>
                <h2 className="text-3xl font-bold text-gray-800">🎭 공연 상세 정보</h2>
                <div className="mt-4 text-gray-700 text-lg leading-8 space-y-4">
                    <p>🔹 **예매 가능 시간:**
                        월~토 관람: 전일 17시까지
                        일요일 관람: 전일 11시까지
                    </p>
                    <p>🕒 **공연 일정:**
                        - 화, 목, 금: 오후 8시
                        - 수: 오후 4시, 8시
                        - 토: 오후 3시, 7시
                        - 일/공휴일: 오후 2시, 6시
                    </p>
                    <p>⚠ **공지사항:**
                        - 한 개 ID당 **회차당 4매까지** 예매 가능
                        - 4월 4일(금) 오전 11시 ~ 4월 6일(일) 오후 5시 59분까지 **무통장 입금 제한**
                    </p>
                </div>
            </div>

            {/* 출연진 정보 */}
            {performance.cast && performance.cast.length > 0 && (
                <div className="mt-12 bg-gray-100 rounded-lg ">
                    <h2 className="text-3xl font-bold text-gray-800">🌟 출연진 소개</h2>
                    <div className="mt-6 grid grid-cols-2 gap-6">
                        {performance.cast.map((actor, index) => (
                            <div key={index} className="flex items-center bg-white rounded-lg shadow-md p-4">
                                <img
                                    src={`/uploads/${actor.image}`}
                                    alt={actor.name}
                                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-300"
                                />
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-800">{actor.name}</h3>
                                    <p className="text-gray-600 text-sm">{actor.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default PerformanceDetail