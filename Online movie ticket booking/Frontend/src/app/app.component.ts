import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookingComponent } from "./booking/booking.component";
import { SeatSelectionComponent } from "./seat-selection/seat-selection.component";
import { TicketComponent } from "./ticket/ticket.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookingComponent, SeatSelectionComponent, TicketComponent, ConfirmationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BookingTickets';
}
