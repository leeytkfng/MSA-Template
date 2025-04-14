import { useState } from "react";
import { fakeReviews } from "../data/fakeReviews";

const getRandomReviews = (reviews, count) => {
    const shuffled = [...reviews].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
};

const ReviewSection = () => {
    const [randomReviews, setRandomReviews] = useState(getRandomReviews(fakeReviews, 4));

    const handleShuffle = () => {
        setRandomReviews(getRandomReviews(fakeReviews, 4));
    };

    return (
        <section className="text-center py-10">
            <h2 className="text-2xl font-bold mb-6">관람객 리뷰</h2>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4 mb-8">
                {randomReviews.map((item, index) => (
                    <li
                        key={index}
                        className="flex bg-white rounded-lg overflow-hidden p-4 cursor-pointer hover:shadow-lg transition"
                    >
                        <div className="w-7/10 flex flex-col justify-between pr-4 text-left">
                            <p className="text-sm text-gray-700 mt-2">{item.title}</p>
                            <h3 className="font-semibold text-lg">{item.review}</h3>

                            <div
                                className="text-xs text-gray-500 mt-2"
                                style={{
                                    display: 'block',
                                    height: '80px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                }}
                            >
                                {item.reviewDetail}
                            </div>

                            <div className="text-yellow-500 mt-2">⭐ {item.score}</div>
                        </div>

                        <div className="w-3/10 flex-shrink-0">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-32 h-48 object-cover "
                            />
                        </div>
                    </li>
                ))}
            </ul>
            <button
                onClick={handleShuffle}
                className="px-6 py-2 bg-white text-gray-600 border border-gray-600 rounded-full text-sm font-semibold transition"
            >
                다른 리뷰 보기
            </button>
        </section>
    );
};

export default ReviewSection;