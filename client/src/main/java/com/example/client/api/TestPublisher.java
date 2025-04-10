package com.example.client.api;

import com.example.client.api.dto.ReservationMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class TestPublisher {

    private final RabbitTemplate rabbitTemplate;

    public TestPublisher(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate  = rabbitTemplate;
    }

    @PostMapping("/send")
    public ResponseEntity<String> send(@RequestBody ReservationMessage message){
        System.out.println("dd:"+message);
        rabbitTemplate.convertAndSend("reservation.complete.queue", message);
        return ResponseEntity.ok("메세지 전송완료");
    }
}
