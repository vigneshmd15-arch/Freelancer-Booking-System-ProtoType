package com.Freelancer_Booking_System.FreelancerBooking.Controller;


import org.springframework.web.bind.annotation.*;

import com.Freelancer_Booking_System.FreelancerBooking.Entity.Booking;
import com.Freelancer_Booking_System.FreelancerBooking.Service.BookingService;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    private final BookingService service;

    public BookingController(BookingService service) {
        this.service = service;
    }

    @GetMapping("/available-slots")
    public List<LocalTime> getAvailableSlots(
            @RequestParam Long freelancerId,
            @RequestParam LocalDate date) {

        return service.getAvailableSlots(freelancerId, date);
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return service.createBooking(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return service.getAllBookings();
    }

    @PutMapping("/{id}/cancel")
    public String cancelBooking(@PathVariable Long id) {
        service.cancelBooking(id);
        return "Booking cancelled successfully";
    }
    
    @GetMapping("/freelancer/{freelancerId}")
    public List<Booking> getFreelancerBookings(
            @PathVariable Long freelancerId) {

        return service.getFreelancerBookings(freelancerId);
    }
    
    @PutMapping("/{id}/accept")
    public Booking acceptBooking(@PathVariable Long id) {

        return service.acceptBooking(id);
    }
    
    @PutMapping("/{id}/reject")
    public Booking rejectBooking(@PathVariable Long id) {

        return service.rejectBooking(id);
    }
}