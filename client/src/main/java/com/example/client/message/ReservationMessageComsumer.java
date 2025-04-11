package com.example.client.message;

import com.example.client.message.dto.ReservationMessage;
import com.example.client.infrastructure.UserReservation;
import com.example.client.infrastructure.persistence.UserReservationRepositroy;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationMessageComsumer {
    //컨슈머 부분
    private final UserReservationRepositroy reservationRepositroy;

    public ReservationMessageComsumer(UserReservationRepositroy reservationRepositroy){
        this.reservationRepositroy= reservationRepositroy;
    }

    @RabbitListener(queues = "reservation.complete.queue" , containerFactory = "rabbitListenerContainerFactory")
    public void receiveReservation(ReservationMessage message) {
        System.out.println("메세지 수신완료: " + message);
        System.out.println("🧾 uId: " + message.getUId());
        System.out.println("🧾 rSpots: " + message.getRSpots());


        try {
            UserReservation entity = new UserReservation();
            entity.setUserId(message.getUId());
            entity.setPerformanceId(message.getPId());
            entity.setPerformanceTitle(message.getPTitle());
            entity.setPerformanceDate(message.getPDate());
            entity.setPlace(message.getPPlace());

            List<String> spots = message.getRSpots();
            entity.setSeats(spots != null ? String.join(", ", spots) : "미지정");

            entity.setPrice(message.getPPrice());
            System.out.println(entity);
            reservationRepositroy.save(entity);
        } catch (Exception e) {
            System.out.println("❌ 처리 중 오류 발생: " + e.getMessage());
            e.printStackTrace();
        }
    }


}
