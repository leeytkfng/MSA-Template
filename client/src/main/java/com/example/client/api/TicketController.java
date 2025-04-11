package com.example.client.api;

import com.example.client.application.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class TicketController {

    private final ReservationService reservationService;

    public TicketController(ReservationService reservationService){
        this.reservationService =reservationService;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<?>> getTicketById(@PathVariable Long userId) {
        return ResponseEntity.ok(reservationService.getTicketByUser(userId));
    }

}
