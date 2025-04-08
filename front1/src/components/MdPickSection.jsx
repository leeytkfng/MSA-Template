import { useState } from "react";
import mdPickList from "../data/mdPickList";

const ITEMS_PER_PAGE = 5;
const CARD_WIDTH = 220;
const GAP = 24;
const CONTAINER_WIDTH = ITEMS_PER_PAGE * (CARD_WIDTH + GAP); // 카드 + 간격

const MdPickSection = () => {
  const [page, setPage] = useState(0);
  const maxPage = Math.ceil(mdPickList.length / ITEMS_PER_PAGE) - 1;

  const handleNext = () => {
    if (page < maxPage) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const categories = [
    { name: "오직인터파크에서만", highlight: true },
    { name: "핫이슈 클래식&무용" },
    { name: "화제의 전시" },
    { name: "해외 공연" },
  ];

  const slideStyle = {
    transform: `translateX(-${page * CONTAINER_WIDTH}px)`,
    transition: "transform 0.5s ease-in-out",
  };

  return (
    <section className="text-center relative">
      <h2 className="text-2xl font-bold mb-4">MD Pick!</h2>

      {/* 카테고리 버튼 */}
      <div className="flex justify-center gap-2 mb-6 flex-wrap">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            className={`px-4 py-2 rounded-full text-sm border ${
              cat.highlight
                ? "bg-purple-600 text-white font-semibold"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* 슬라이드 영역 */}
      <div
        className="relative overflow-hidden mx-auto"
        style={{ width: `${CONTAINER_WIDTH}px` }}
      >
        {/* 카드 슬라이드 트랙 */}
        <div className="flex" style={slideStyle}>
          {mdPickList.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0"
              style={{ width: `${CARD_WIDTH}px`, marginRight: `${GAP}px` }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="rounded-lg shadow-md mb-2 w-full"
              />
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-600">{item.place}</p>
              <p className="text-xs text-gray-500">{item.period}</p>
            </div>
          ))}
        </div>

        {/* 슬라이드 버튼 */}
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10 disabled:opacity-30"
        >
          ◀
        </button>
        <button
          onClick={handleNext}
          disabled={page === maxPage}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10 disabled:opacity-30"
        >
          ▶
        </button>
      </div>
    </section>
  );
};

export default MdPickSection;
