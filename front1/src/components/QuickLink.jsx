import { useRef, useState } from "react";

function QuickLink() {
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollStart, setScrollStart] = useState(0);

    const data = [
        {
            id: 1,
            title: "청년문화예술패스",
            item: "청년문화예술패스 신청하기",
            image: "/images/pass.png",
        },
        {
            id: 2,
            title: "공연 혜택",
            item: "혜택 확인하기",
            image: "/images/gift.png",
        },
        {
            id: 3,
            title: "티켓 랭킹",
            item: "지금 가장 HOT한 공연!",
            image: "/images/rank.png",
        },
        {
            id: 4,
            title: "고객 센터",
            item: "고객 센터 바로가기",
            image: "/images/help.png",
        },
    ];

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollStart(scrollRef.current.scrollLeft);
        document.body.style.userSelect = "none";
    };

    const handleMouseUpOrLeave = () => {
        setIsDragging(false);
        document.body.style.userSelect = "auto";
    };

    const handleImageMouseDown = (e) => {
        e.preventDefault();
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 1.0;
        scrollRef.current.scrollLeft = scrollStart - walk;
    };

    return (
        <section className="py-6">
            <div
                ref={scrollRef}
                className={`flex overflow-x-auto space-x-4 px-4 ${
                    isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onMouseMove={handleMouseMove}
                style={{
                    scrollbarWidth: "none",
                    msOverflowStyle: "none",
                }}
            >
                {data.map((item) => (
                    <li
                        key={item.id}
                        className="min-w-[400px] flex items-center bg-white shadow-md rounded p-3 flex-shrink-0"
                    >
                        <div className="w-7/12 pr-2 text-left">
                            <h3 className="font-semibold text-base">{item.title}</h3>
                            <p className="text-xs text-gray-700 mt-1">{item.item}</p>
                        </div>
                        <div
                            className="w-5/12 flex-shrink-0 ml-auto flex justify-center items-center"
                            onMouseDown={handleImageMouseDown}
                        >
                            <img
                                src={item.image}
                                alt="img"
                                className="w-20 h-24 object-contain"
                            />
                        </div>
                    </li>
                ))}
            </div>

            <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}

export default QuickLink;