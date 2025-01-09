import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { BookingService } from '../booking.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-booking',
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit{
  movies =[
    { id :1, name : 'Singham', genre: 'Action'},
    { id :2, name : 'Phir Hera Pheri', genre: 'Comedy'},
    { id :3, name : 'Kuch Kuch Hota Hai', genre: 'Romance'},
    { id: 4, name: 'Avengers: Endgame', genre: 'Action' },
    { id: 5, name: 'The Dark Knight', genre: 'Action' },
    { id: 6, name: 'Inception', genre: 'Sci-Fi' },
    { id: 7, name: 'The Wolf of Wall Street', genre: 'Biography' },
    { id: 8, name: 'Forrest Gump', genre: 'Drama' },
    { id: 9, name: 'Interstellar', genre: 'Sci-Fi' },
    { id: 10, name: '3 Idiots', genre: 'Comedy' },
    { id: 11, name: 'Dangal', genre: 'Biography' },
    { id: 12, name: 'Sholay', genre: 'Action' },
    { id: 13, name: 'Titanic', genre: 'Romance' },
    { id: 14, name: 'Parasite', genre: 'Thriller' },
    { id: 15, name: 'The Shawshank Redemption', genre: 'Drama' }
  ];
  selectedMovie: any;
  selectedSeats: any;


  constructor(private router : Router,
    private bookingService : BookingService
  ){}

  ngOnInit(): void {
   this.fetchMovies();
  }
  
  fetchMovies() {
    this.bookingService.getMovies().subscribe(
      (movies: { id: number; name: string; genre: string; }[]) => {
        this.movies = movies;
      },
      (error: any) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  selectMovie(movieId: number) {
    const selectedMovie = this.movies.find((movie) => movie.id === movieId);
    if (selectedMovie) {
      this.bookingService.setSelectedMovie(selectedMovie);
      this.router.navigate(['/seat-selection']);
    }
  }




createTicket(bookingData: any) {
  const ticketData = {
    movie: this.selectedMovie.name,
    seats: this.selectedSeats.join(', '),
    date: new Date().toISOString(),
    bookingId: bookingData.id, 
  };

  this.bookingService.createTicket(ticketData).subscribe(
    (response: any) => {
      console.log('Ticket created successfully', response);
      this.router.navigate(['/confirmation']);
    },
    (error: any) => {
      console.error('Error creating ticket', error);
    }
  );
}

resetBooking() {
  this.bookingService.resetBooking();
  this.selectedMovie = null;
  this.selectedSeats = [];
  this.router.navigate(['/movies']);
}
}


