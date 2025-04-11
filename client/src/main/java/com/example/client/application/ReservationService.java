package com.example.client.application;

import com.example.client.infrastructure.UserReservation;
import com.example.client.infrastructure.persistence.UserReservationRepositroy;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Service
public class ReservationService {

    private final UserReservationRepositroy reservation;

    public ReservationService(UserReservationRepositroy reservation) {
        this.reservation = reservation;
    }

    public List<UserReservation> getTicketByUser(Long userId){
        return reservation.findByUserId(userId);
    }


}
