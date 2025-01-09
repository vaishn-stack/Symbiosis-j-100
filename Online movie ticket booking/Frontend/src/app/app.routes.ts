import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';
import { TicketComponent } from './ticket/ticket.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'/booking'
    },
    {
        path:'',
        component:BookingComponent
    },
    {
        path:'booking',
        component:BookingComponent
    },
    {
        path:'seat-selection',
        component:SeatSelectionComponent
    },
    {
        path:'ticket',
        component:TicketComponent
    },
    {
        path:'confirmation',
        component:ConfirmationComponent
    }
    
];
