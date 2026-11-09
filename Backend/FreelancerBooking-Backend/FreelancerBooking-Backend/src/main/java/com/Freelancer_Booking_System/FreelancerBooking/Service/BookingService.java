package com.Freelancer_Booking_System.FreelancerBooking.Service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Freelancer_Booking_System.FreelancerBooking.Entity.Availability;
import com.Freelancer_Booking_System.FreelancerBooking.Entity.Booking;
import com.Freelancer_Booking_System.FreelancerBooking.Entity.Freelancer;
import com.Freelancer_Booking_System.FreelancerBooking.Repositary.AvailabilityRepository;
import com.Freelancer_Booking_System.FreelancerBooking.Repositary.BookingRepository;
import com.Freelancer_Booking_System.FreelancerBooking.Repositary.FreelancerRepository;

import java.time.*;
import java.util.*;

@Service
public class BookingService {

    private final FreelancerRepository freelancerRepository;
    private final AvailabilityRepository availabilityRepository;
    private final BookingRepository bookingRepository;

    public BookingService(
            FreelancerRepository freelancerRepository,
            AvailabilityRepository availabilityRepository,
            BookingRepository bookingRepository) {

        this.freelancerRepository = freelancerRepository;
        this.availabilityRepository = availabilityRepository;
        this.bookingRepository = bookingRepository;
    }

    public List<LocalTime> getAvailableSlots(
            Long freelancerId,
            LocalDate date) {

        if (date.isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot check past dates");
        }

        Freelancer freelancer = freelancerRepository.findById(freelancerId)
                .orElseThrow(() ->
                    new RuntimeException("Freelancer not found"));

        List<Availability> availabilities =
                availabilityRepository.findByFreelancerAndDayOfWeek(
                        freelancer, date.getDayOfWeek());

        List<Booking> bookings =
                bookingRepository.findByFreelancerAndBookingDate(
                        freelancer, date);

        List<LocalTime> slots = new ArrayList<>();

        for (Availability availability : availabilities) {

            LocalTime time = availability.getStartTime();

            while (!time.plusHours(1).isAfter(availability.getEndTime())) {

                LocalTime slot = time;

                boolean booked = bookings.stream().anyMatch(
                    booking ->
                        !"CANCELLED".equals(booking.getStatus())
                        && !"REJECTED".equals(booking.getStatus())
                        && booking.getStartTime().equals(slot)
                );

                if (!booked &&
                    !(date.equals(LocalDate.now()) &&
                      !slot.isAfter(LocalTime.now()))) {

                    slots.add(slot);
                }

                time = time.plusHours(1);
            }
        }

        return slots;
    }

    @Transactional
    public Booking createBooking(Booking booking) {

        List<LocalTime> slots = getAvailableSlots(
                booking.getFreelancer().getId(),
                booking.getBookingDate()
        );

        if (!slots.contains(booking.getStartTime())) {
            throw new RuntimeException("Selected slot is unavailable");
        }

        booking.setEndTime(booking.getStartTime().plusHours(1));
        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void cancelBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Booking not found"));

        booking.setStatus("CANCELLED");

        bookingRepository.save(booking);
    }
    
    public List<Booking> getFreelancerBookings(Long freelancerId) {

        return bookingRepository.findByFreelancer_Id(freelancerId);
    }
    
    @Transactional
    public Booking acceptBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Booking not found"));

        if (!"PENDING".equals(booking.getStatus())) {
            throw new RuntimeException("Booking is not pending");
        }

        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }
    
    @Transactional
    public Booking rejectBooking(Long id) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Booking not found"));

        if (!"PENDING".equals(booking.getStatus())) {
            throw new RuntimeException("Booking is not pending");
        }

        booking.setStatus("REJECTED");

        return bookingRepository.save(booking);
    }
}