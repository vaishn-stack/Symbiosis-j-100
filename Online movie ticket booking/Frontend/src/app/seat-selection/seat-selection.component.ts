
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-seat-selection',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './seat-selection.component.html',
  styleUrl: './seat-selection.component.css'
})
export class SeatSelectionComponent implements OnInit {
  
  seats: { number: string; isBooked: boolean }[][] = [
    [
      { number: 'A1', isBooked: false },
      { number: 'A2', isBooked: false },
      { number: 'A3', isBooked: false },
      { number: 'A4', isBooked: false },
      { number: 'A5', isBooked: false }
    ],
    [
      { number: 'B1', isBooked: false },
      { number: 'B2', isBooked: false },
      { number: 'B3', isBooked: false },
      { number: 'B4', isBooked: false },
      { number: 'B5', isBooked: false }
    ],
    [
      { number: 'C1', isBooked: false },
      { number: 'C2', isBooked: false },
      { number: 'C3', isBooked: false },
      { number: 'C4', isBooked: false },
      { number: 'C5', isBooked: false }
    ],
    [
      { number: 'D1', isBooked: false },
      { number: 'D2', isBooked: false },
      { number: 'D3', isBooked: false },
      { number: 'D4', isBooked: false },
      { number: 'D5', isBooked: false }
    ],
    [
      { number: 'E1', isBooked: false },
      { number: 'E2', isBooked: false },
      { number: 'E3', isBooked: false },
      { number: 'E4', isBooked: false },
      { number: 'E5', isBooked: false }
    ],
    [
      { number: 'F1', isBooked: false },
      { number: 'F2', isBooked: false },
      { number: 'F3', isBooked: false },
      { number: 'F4', isBooked: false },
      { number: 'F5', isBooked: false }
    ],
    [
      { number: 'G1', isBooked: false },
      { number: 'G2', isBooked: false },
      { number: 'G3', isBooked: false },
      { number: 'G4', isBooked: false },
      { number: 'G5', isBooked: false }
    ]
  ];

  
  
 selectedSeats:string[]=[];
 selectedMovie:any;


  constructor(
    private bookingService: BookingService,
    private router : Router
  
  ){}

  ngOnInit(): void {
    this.selectedMovie = this.bookingService.getSelectedMovie();
  }
  
  toggleSeatSelection(seat: string){
    const index = this.selectedSeats.indexOf(seat);
    if (index === -1) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats.splice(index, 1); 
    }
  }
  confirmBooking() {
    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat before confirming the booking.');
    } else {
      this.bookingService.setSelectedSeats(this.selectedSeats);
      alert('Your booking has been confirmed!');

    const bookingDetails = {
      movieId:this.selectedMovie?.id,
      moviename:this.selectedMovie?.name,
      seats:this.selectedSeats,
      date:new Date().toISOString(),
    };

    this.bookingService.setBookingDetails(bookingDetails);


    this.router.navigate(['/ticket']);
  }
}
}