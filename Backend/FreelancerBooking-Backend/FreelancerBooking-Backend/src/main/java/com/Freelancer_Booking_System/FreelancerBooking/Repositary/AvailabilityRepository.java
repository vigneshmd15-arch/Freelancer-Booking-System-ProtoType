package com.Freelancer_Booking_System.FreelancerBooking.Repositary;

import com.Freelancer_Booking_System.FreelancerBooking.Entity.*;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.DayOfWeek;
import java.util.List;

public interface AvailabilityRepository
        extends JpaRepository<Availability, Long> {

    List<Availability> findByFreelancerAndDayOfWeek(
            Freelancer freelancer,
            DayOfWeek dayOfWeek
    );
}