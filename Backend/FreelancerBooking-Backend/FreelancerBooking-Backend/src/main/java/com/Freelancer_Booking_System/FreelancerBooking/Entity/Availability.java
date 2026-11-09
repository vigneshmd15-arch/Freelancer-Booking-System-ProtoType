package com.Freelancer_Booking_System.FreelancerBooking.Entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.DayOfWeek;
import java.time.LocalTime;

@Entity
@Data
public class Availability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "freelancer_id")
    private Freelancer freelancer;

    @Enumerated(EnumType.STRING)
    private DayOfWeek dayOfWeek;

    private LocalTime startTime;

    private LocalTime endTime;
}