import { useState } from "react";
import { fakeRankings } from "../data/fakeRankings";

const genres = ["뮤지컬", "콘서트"];

const GenreRanking = () => {
    const [selectedGenre, setSelectedGenre] = useState("뮤지컬");

    return (
        <section className="text-center py-10">
            <h2 className="text-2xl font-bold mb-6">장르별 랭킹</h2>

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
                {fakeRankings[selectedGenre].map((item, index) => (
                    <li
                        key={index}
                        className="flex gap-4 items-start bg-white shadow-md rounded-lg overflow-hidden p-4"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-28 h-36 object-cover rounded-md flex-shrink-0"
                        />
                        <div className="text-left flex-grow">
                            <div className="text-purple-600 font-bold text-lg">
                                {index + 1}
                            </div>
                            <h3 className="font-semibold text-base">{item.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{item.place}</p>
                            <p className="text-sm text-gray-500">{item.date}</p>
                            <span className="text-yellow-500 text-sm mt-2 inline-block">
                ⭐ {item.score}
              </span>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default GenreRanking;
