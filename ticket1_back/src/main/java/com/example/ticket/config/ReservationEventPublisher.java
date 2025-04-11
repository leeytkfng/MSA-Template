package com.example.ticket.message;

import com.example.ticket.dto.ReservationMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ReservationEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    private static final String EXCHANGE_NAME = "reservation.exchange";
    private static final String ROUTING_KEY = "reservation.complete.key";

    public void sendReservationMessage(ReservationMessage message) {
        rabbitTemplate.convertAndSend(EXCHANGE_NAME, ROUTING_KEY, message);
        System.out.println("📨 메시지 전송 완료: " + message);
    }
}
