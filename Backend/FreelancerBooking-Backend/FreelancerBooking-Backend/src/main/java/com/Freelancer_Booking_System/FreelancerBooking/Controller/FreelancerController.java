package com.Freelancer_Booking_System.FreelancerBooking.Controller;


import org.springframework.web.bind.annotation.*;

import com.Freelancer_Booking_System.FreelancerBooking.Entity.Freelancer;
import com.Freelancer_Booking_System.FreelancerBooking.Service.FreelancerService;

import java.util.List;

@RestController
@RequestMapping("/api/freelancers")
@CrossOrigin(origins = "http://localhost:5173")
public class FreelancerController {

    private final FreelancerService service;

    public FreelancerController(FreelancerService service) {
        this.service = service;
    }

    @PostMapping
    public Freelancer addFreelancer(
            @RequestBody Freelancer freelancer) {
        return service.addFreelancer(freelancer);
    }

    @GetMapping
    public List<Freelancer> getAllFreelancers() {
        return service.getAllFreelancers();
    }

    @GetMapping("/{id}")
    public Freelancer getFreelancer(@PathVariable Long id) {
        return service.getFreelancer(id);
    }

    @DeleteMapping("/{id}")
    public String deleteFreelancer(@PathVariable Long id) {
        service.deleteFreelancer(id);
        return "Freelancer deleted successfully";
    }
}