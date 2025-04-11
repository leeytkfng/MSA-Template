import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Loading from "./LoadingPage.jsx";
import SelectSeat from "./SelectSeat.jsx";
import ConfirmPage from "./ConfirmBooking.jsx";
import CompletePage from "./CompleteBooking.jsx";

function PopupApp() {
    return (
            <Routes>
                <Route path="/loading" element={<Loading />} />
                <Route path="/select/:key" element={<SelectSeat />} />
                <Route path="/confirm/:key" element={<ConfirmPage />} />
                <Route path="/complete/:key" element={<CompletePage />} />
                {/* :key는 예매 확정된 키를 전달받기 위한 param */}
            </Routes>
    );
}

export default PopupApp;
