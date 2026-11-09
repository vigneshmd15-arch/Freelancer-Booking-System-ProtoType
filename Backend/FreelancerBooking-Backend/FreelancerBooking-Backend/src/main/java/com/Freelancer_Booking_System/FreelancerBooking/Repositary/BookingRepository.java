package com.Freelancer_Booking_System.FreelancerBooking.Repositary;

import com.Freelancer_Booking_System.FreelancerBooking.Entity.*;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface BookingRepository
        extends JpaRepository<Booking, Long> {

    List<Booking> findByFreelancerAndBookingDate(
            Freelancer freelancer,
            LocalDate bookingDate
    );
    
    List<Booking> findByFreelancer_Id(Long freelancerId);

    boolean existsByFreelancerAndBookingDateAndStartTimeAndStatusNot(
            Freelancer freelancer,
            LocalDate bookingDate,
            LocalTime startTime,
            String status
    );

}