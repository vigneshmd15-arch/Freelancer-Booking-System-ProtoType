package com.Freelancer_Booking_System.FreelancerBooking.Entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Freelancer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String skill;

    private String description;

    private double hourlyRate;
}	