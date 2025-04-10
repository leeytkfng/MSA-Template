package com.example.client.infrastructure.persistence;

import com.example.client.infrastructure.UserReservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserReservationRepositroy extends JpaRepository<UserReservation,Long> {
}
