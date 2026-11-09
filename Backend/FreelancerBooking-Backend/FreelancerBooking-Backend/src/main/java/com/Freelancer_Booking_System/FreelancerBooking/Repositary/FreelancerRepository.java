package com.Freelancer_Booking_System.FreelancerBooking.Repositary;

import com.Freelancer_Booking_System.FreelancerBooking.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FreelancerRepository
        extends JpaRepository<Freelancer, Long> {
}