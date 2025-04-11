package com.example.client.message.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class ReservationMessage implements Serializable {

    @JsonProperty("uid")
    private Long uId;

    @JsonProperty("pid")
    private Long pId;

    @JsonProperty("ptitle")
    private String pTitle;

    @JsonProperty("pplace")
    private String pPlace;

    @JsonProperty("pdate")
    private String pDate;

    @JsonProperty("rspots")
    private List<String> rSpots;

    @JsonProperty("pprice")
    private Integer pPrice;
}
