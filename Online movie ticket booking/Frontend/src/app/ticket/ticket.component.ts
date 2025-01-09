
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-ticket',
  imports: [FormsModule, CommonModule, NavbarComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit{
  
  movie:any;
  selectedSeats: string[] =[];
  bookingDetails:any;

  constructor(private router : Router,
      private bookingService : BookingService,
   
    ){}
      
 

  ngOnInit(): void {
    this.bookingDetails = this.bookingService.getBookingDetails();
    if (this.bookingDetails) {
      this.movie = this.bookingDetails.movie;
      this.selectedSeats = this.bookingDetails.seats;
    } else {
      console.error('Booking details are missing.');
      this.router.navigate(['/booking']);
    }
  }
  
  proceedToConfirmation() {
    this.router.navigate(['/confirmation']);
  }

  navigateToBooking() {
    this.router.navigate(['/booking']);
  }
}

