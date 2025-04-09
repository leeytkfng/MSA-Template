import {useEffect, useState} from "react";
import { fakeRankings } from "../data/fakeRankings";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const genres = ["뮤지컬", "콘서트"];

const GenreRanking = () => {
    const [selectedGenre, setSelectedGenre] = useState("뮤지컬");
    const { genre } = useParams();
    const BASE_URL = "/images/";
    const [performances, setPerformances] = useState([]);

    const navigate = useNavigate();

    const [form, setForm] = useState({
        pTitle: "",
        pManager: "",
        pGenre: "",
        pDate: "",
        pSpot: 0,
        pAllSpot: 0,
        pPrice: 0,
        pPlace: "",
        pImg: "",
        pEndTime: "",
    });

    const loadPerformances = async() => {
        try {
            const response = await axios.get("http://localhost:9090/api/performances");
            setPerformances(response.data);
        } catch (error) {
            console.error("공연 목록을 불러오는데 실패했습니다.");
        }
    };
    const loadGenre = async(genre) => {
        try {
            const response = await axios.get(`http://localhost:9090/api/performances/genre/${genre}`);
            console.log("API 응답:", response.data);
            setPerformances(response.data);
        } catch(error) {
            console.error("공연 정보를 불러오는데 실패했습니다:", error);
        }
    };
    useEffect(() => {
        if(genre) {
            loadGenre(genre);
        } else {
            loadPerformances();
        }
    }, [genre]);

    useEffect(() => {
        console.log("공연 데이터가 업데이트됨:", performances);
    }, [performances]);



    return (
        <section className="text-center py-10">
            <h2 className="text-2xl font-bold mb-6">나만의 장르</h2>

            {/* 탭 버튼 */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
                {genres.map((genre) => (
                    <button
                        key={genre}
                        onClick={() => setSelectedGenre(genre)}
                        className={`px-4 py-2 rounded-full text-sm border transition-all ${
                            selectedGenre === genre
                                ? "bg-purple-600 text-white font-semibold"
                                : "bg-white text-black border-gray-300"
                        }`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {/* 랭킹 리스트 */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
                {performances.map((performance) => (
                    <li
                        key={performance.pid}
                        onClick={() => navigate(`/performances/${performance.pid}`)}
                        className="flex gap-4 items-start bg-white shadow-md rounded-lg overflow-hidden p-4"
                        style={{cursor:"pointer"}}
                    >
                        <img
                            src={`${BASE_URL}${performance.pimg}`}
                            alt={performance.ptitle}
                            className="w-28 h-36 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="text-left flex-grow">
                            <div className="text-purple-600 font-bold text-lg">
                                {performance.pid}
                            </div>
                            <h3 className="font-semibold text-base">{performance.ptitle}</h3>
                            <p className="text-sm text-gray-600 mt-1">{performance.pplace}</p>
                            <p className="text-sm text-gray-500">{new Date(performance.pdate).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit"
                            }).replace(/\./g, "").replace(/(\d{4}) (\d{2}) (\d{2})/, "$1년 $2월 $3일")}</p>
                            <span className="text-yellow-500 text-sm mt-2 inline-block">
                ⭐ {performance.pprice}
              </span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default GenreRanking;
