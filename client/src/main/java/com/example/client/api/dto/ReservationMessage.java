package com.example.client.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReservationMessage implements Serializable {
    //직렬화를 안할경우 에러남
    public Long getuId() {
        return uId;
    }

    public void setuId(Long uId) {
        this.uId = uId;
    }

    public Long getpId() {
        return pId;
    }

    public void setpId(Long pId) {
        this.pId = pId;
    }

    public String getpTitle() {
        return pTitle;
    }

    public void setpTitle(String pTitle) {
        this.pTitle = pTitle;
    }

    public String getpPlace() {
        return pPlace;
    }

    public void setpPlace(String pPlace) {
        this.pPlace = pPlace;
    }

    public String getpDate() {
        return pDate;
    }

    public void setpDate(String pDate) {
        this.pDate = pDate;
    }

    public List<String> getrSpots() {
        return rSpots;
    }

    public void setrSpots(List<String> rSpots) {
        this.rSpots = rSpots;
    }

    public Integer getpPrice() {
        return pPrice;
    }

    public void setpPrice(Integer pPrice) {
        this.pPrice = pPrice;
    }

    private Long uId;
    private Long pId;
    private String pTitle;
    private String pPlace;
    private String pDate;
    private List<String> rSpots;
    private Integer pPrice;
}
