package com.example.client.infrastructure;

import com.example.client.api.dto.ReservationMessage;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class UserReservation {

    public UserReservation() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getPerformanceId() {
        return performanceId;
    }

    public void setPerformanceId(Long performanceId) {
        this.performanceId = performanceId;
    }

    public String getPerformanceTitle() {
        return performanceTitle;
    }

    public void setPerformanceTitle(String performanceTitle) {
        this.performanceTitle = performanceTitle;
    }

    public String getPerformanceDate() {
        return performanceDate;
    }

    public void setPerformanceDate(String performanceDate) {
        this.performanceDate = performanceDate;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getSeats() {
        return seats;
    }

    public void setSeats(String seats) {
        this.seats = seats;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public UserReservation(Long id, Long userId, Long performanceId, String performanceTitle, String performanceDate, String place, String seats, Integer price) {
        Id = id;
        this.userId = userId;
        this.performanceId = performanceId;
        this.performanceTitle = performanceTitle;
        this.performanceDate = performanceDate;
        this.place = place;
        this.seats = seats;
        this.price = price;
    }

    private Long userId;           // 예매한 유저 ID
    private Long performanceId;    // 공연 ID
    private String performanceTitle;
    private String performanceDate;
    private String place;
    private String seats;
    private Integer price;
}
