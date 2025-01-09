package com.trg.booking2.entity;

import java.util.List;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Ticket {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String movieName;

	    @ElementCollection
	    private List<String> seats;

	    private String date;

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getMovieName() {
			return movieName;
		}

		public void setMovieName(String movieName) {
			this.movieName = movieName;
		}

		public List<String> getSeats() {
			return seats;
		}

		public void setSeats(List<String> seats) {
			this.seats = seats;
		}

		public String getDate() {
			return date;
		}

		public void setDate(String date) {
			this.date = date;
		}

		@Override
		public String toString() {
			return "Ticket [id=" + id + ", movieName=" + movieName + ", seats=" + seats + ", date=" + date + "]";
		}
	    
	    
}
