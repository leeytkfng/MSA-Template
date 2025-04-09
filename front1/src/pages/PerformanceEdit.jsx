import axios from "axios";
import {useState} from "react";


function PerformanceEdit() {
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


    // 입력 값 변경 핸들러
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // 공연 등록
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8765/api/performances", form, {
                headers: { "Content-Type": "application/json" },
            });
            alert("공연이 등록되었습니다!");
        } catch (error) {
            console.error("저장 오류:", error);
        }
    };

    // 이미지 파일 업로드
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);

        try {
            await axios.post("http://localhost:8765/api/performances/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setForm((prev) => ({ ...prev, pImg: file.name }));
        } catch (error) {
            console.error("파일 업로드 오류:", error);
        }
    };

    return (
        <section className="max-w-screen-lg mx-auto p-16 bg-white rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-10 text-purple-700">공연 등록</h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { label: "공연명", name: "pTitle", type: "text" },
                    { label: "담당자", name: "pManager", type: "text" },
                    { label: "장르", name: "pGenre", type: "text" },
                    { label: "가격", name: "pPrice", type: "text" },
                    { label: "위치", name: "pPlace", type: "text" },
                ].map(({ label, name, type }) => (
                    <div key={name} className="mb-6 flex flex-col">
                        <label className="text-sm font-medium text-gray-700">{label}</label>
                        <input
                            type={type}
                            name={name}
                            value={form[name]}
                            onChange={handleChange}
                            className="min-w-[250px] max-w-xl p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500"
                            required
                        />
                    </div>
                ))}

                <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { label: "공연 날짜", name: "pDate" },
                        { label: "종료 날짜", name: "pEndTime" },
                    ].map(({ label, name }) => (
                        <div key={name} className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">{label}</label>
                            <input
                                type="datetime-local"
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                className="min-w-[250px] max-w-xl p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                        { label: "남은 좌석", name: "pSpot", type: "number" },
                        { label: "전체 좌석", name: "pAllSpot", type: "number" },
                    ].map(({ label, name, type }) => (
                        <div key={name} className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">{label}</label>
                            <input
                                type={type}
                                name={name}
                                value={form[name]}
                                onChange={handleChange}
                                className="min-w-[250px] max-w-xl p-3 border border-gray-400 rounded-md focus:ring-2 focus:ring-purple-500"
                                required
                            />
                        </div>
                    ))}
                </div>

                <div className="col-span-3 flex flex-col">
                    <label className="text-sm font-medium text-gray-700">타이틀 이미지</label>
                    <input type="file" onChange={handleFileUpload} className="min-w-[250px] max-w-xl p-3 border border-gray-400 rounded-md" required />
                </div>

                <div className="col-span-3 text-center">
                    <button type="submit" className="w-full px-10 py-4 rounded-lg bg-purple-600 text-white font-semibold shadow-md hover:bg-purple-700 hover:scale-110 transition-transform">
                        저장
                    </button>
                </div>
            </form>
        </section>


    );
}

export default PerformanceEdit;