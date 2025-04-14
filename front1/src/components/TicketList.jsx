import React, { useEffect, useState } from "react";
import apiClient from "../apiClient";
import "../style/TicketList.css";

function TicketList({ userId }) {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await apiClient.get(`/api/users/${userId}`);
                setTickets(response.data);
            } catch (error) {
                console.error("티켓 조회 실패:", error);
            }
        };

        if (userId) fetchTickets();
    }, [userId]);

    const formatDate = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString("ko-KR");
    };

    const getStatusText = (date) => {
        const now = new Date();
        return new Date(date) < now ? "관람 완료" : "예정";
    };

    return (
        <div className="ticket-list">
            {tickets.map((ticket, index) => (
                <div className="ticket-card" key={index}>
                    <div className="ticket-info">
                        <p className="ticket-title">{ticket.performanceTitle}</p>
                        <p><strong>일시:</strong> {formatDate(ticket.performanceDate)}</p>
                        <p><strong>장소:</strong> {ticket.place}</p>
                        <p><strong>좌석:</strong> {ticket.seats}</p>
                        <p className={`status ${getStatusText(ticket.performanceDate) === "관람 완료" ? "booked" : "not-booked"}`}>
                            {getStatusText(ticket.performanceDate)}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TicketList;
