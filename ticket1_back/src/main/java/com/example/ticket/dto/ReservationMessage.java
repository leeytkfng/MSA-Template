package com.example.ticket.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class ReservationMessage implements Serializable {

    // ReservationMessage.java (티켓 서비스 쪽)
    private Long uId;
    private Long pId;
    private String pTitle;
    private String pPlace;
    private String pDate;
    private List<String> rSpots;
    private Integer pPrice;


}
