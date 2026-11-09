package com.Freelancer_Booking_System.FreelancerBooking.Service;

import com.Freelancer_Booking_System.FreelancerBooking.Entity.*;
import com.Freelancer_Booking_System.FreelancerBooking.Repositary.*;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FreelancerService {

    private final FreelancerRepository repository;

    public FreelancerService(FreelancerRepository repository) {
        this.repository = repository;
    }

    public Freelancer addFreelancer(Freelancer freelancer) {
        return repository.save(freelancer);
    }

    public List<Freelancer> getAllFreelancers() {
        return repository.findAll();
    }

    public Freelancer getFreelancer(Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Freelancer not found"));
    }

    public void deleteFreelancer(Long id) {
        repository.deleteById(id);
    }
}