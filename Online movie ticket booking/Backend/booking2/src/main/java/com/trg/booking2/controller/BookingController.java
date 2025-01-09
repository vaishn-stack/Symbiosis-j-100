package com.trg.booking2.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.trg.booking2.entity.Booking;
import com.trg.booking2.repository.BookingRepository;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins="http://localhost:4200")
public class BookingController {

	private final BookingRepository bookingRepository;

	public BookingController(BookingRepository bookingRepository) {
		this.bookingRepository = bookingRepository;
	}

	@GetMapping
	public ResponseEntity<List<Booking>> getAllBookings() {
		return ResponseEntity.ok(bookingRepository.findAll());
	}

	@PostMapping
	public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
	    try {
	        booking.setBookingTime(LocalDateTime.now());
	        Booking savedBooking = bookingRepository.save(booking);
	        return ResponseEntity.status(201).body(savedBooking);
	    } catch (Exception e) {
	        // Log the exception for debugging purposes
	        e.printStackTrace();
	        return ResponseEntity.status(500).build();  // Internal Server Error
	    }
	}

	@GetMapping("/{id}")
	public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
		Optional<Booking> booking = bookingRepository.findById(id);
		return booking.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
		if (bookingRepository.existsById(id)) {
			bookingRepository.deleteById(id);
			return ResponseEntity.noContent().build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Booking> updateBooking(@PathVariable Long id, @RequestBody Booking updateBooking) {
		Optional<Booking> existingBookingOptional = bookingRepository.findById(id);

		if (existingBookingOptional.isPresent()) {
			Booking existingBooking = existingBookingOptional.get();
			existingBooking.setUserId(updateBooking.getUserId());
			existingBooking.setMovieId(updateBooking.getMovieId());
			existingBooking.setSeatNumber(updateBooking.getSeatNumber());
			existingBooking.setBookingTime(LocalDateTime.now());
			Booking updatedBooking = bookingRepository.save(existingBooking);
			return ResponseEntity.ok(updatedBooking); 
		} else {
			return ResponseEntity.notFound().build();
		}
	}

}
