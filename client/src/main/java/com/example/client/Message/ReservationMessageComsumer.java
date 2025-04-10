package com.example.client.Message;

import com.example.client.api.dto.ReservationMessage;
import com.example.client.infrastructure.UserReservation;
import com.example.client.infrastructure.persistence.UserReservationRepositroy;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class ReservationMessageComsumer {
    //컨슈머 부분
    private final UserReservationRepositroy reservationRepositroy;

    public ReservationMessageComsumer(UserReservationRepositroy reservationRepositroy){
        this.reservationRepositroy= reservationRepositroy;
    }

    @RabbitListener(queues = "reservation.complete.queue")
    public void receiveReservation(ReservationMessage message){
        //로그 확인
        System.out.println("메세지 수신완료:" + message);

        //저장하는 로직
        UserReservation entity = new UserReservation();
        entity.setUserId(message.getuId());
        entity.setPerformanceId(message.getpId());
        entity.setPerformanceTitle(message.getpTitle());
        entity.setPerformanceDate(message.getpDate());
        entity.setPlace(message.getpPlace());
        entity.setSeats(String.join(", ", message.getrSpots()));
        entity.setPrice(message.getpPrice());

        reservationRepositroy.save(entity);
    }

}
