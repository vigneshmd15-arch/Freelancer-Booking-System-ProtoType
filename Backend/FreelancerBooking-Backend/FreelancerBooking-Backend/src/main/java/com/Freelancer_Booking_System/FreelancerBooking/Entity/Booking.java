package com.Freelancer_Booking_System.FreelancerBooking.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Data
@Table(
    uniqueConstraints = {
        @UniqueConstraint(
            columnNames = {"freelancer_id", "booking_date", "start_time"}
        )
    }
)
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "freelancer_id")
    private Freelancer freelancer;

    private String customerName;

    private String customerEmail;

    private LocalDate bookingDate;

    private LocalTime startTime;

    private LocalTime endTime;

    private String status;
}