  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { BehaviorSubject, Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class BookingService {
    private baseUrl = 'http://localhost:3030';

    private memoryStorage: { [key: string]: any } = {};
  private selectedMovie: any = null;
  private selectedSeats: string[] = [];
  private bookingDetailsSubject = new BehaviorSubject<any>(null);
    bookingDetails: any;

    constructor(private http: HttpClient) {}
    resetBooking() {
      this.selectedMovie = null;
      this.selectedSeats = [];
      this.bookingDetailsSubject.next(null);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('bookingDetails');
        localStorage.removeItem('selectedMovie');
      }
    }


    bookSeats(bookingDetails: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/api/booking`, bookingDetails);
    }

    getMovies(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/api/movies`);
    }

    createBooking(booking: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/api/booking`, booking);
    }


    getBookingDetails() {
      if (typeof window !== 'undefined') {
        const storedDetails = localStorage.getItem('bookingDetails');
        return storedDetails ? JSON.parse(storedDetails) : null;
      }
      return this.memoryStorage['bookingDetails'] || null;
    }

 
    setBookingDetails(details: any) {
      if (details && details.movieId && details.moviename) {
        const formattedDetails = {
          movie: {
            id: details.movieId,
            name: details.moviename,
          },
          seats: details.seats || [],
          date: details.date || new Date().toISOString(),
        };
  
        localStorage.setItem('bookingDetails', JSON.stringify(formattedDetails));
        this.bookingDetailsSubject.next(formattedDetails); 
      }
    }
    
     getSelectedSeats(): string[] {
      return this.selectedSeats;
    }

    getSelectedMovie(): any {
      if (!this.selectedMovie && typeof window !== 'undefined') {
        const storedMovie = localStorage.getItem('selectedMovie');
        this.selectedMovie = storedMovie ? JSON.parse(storedMovie) : null;
      }
      return this.selectedMovie;
    }

    setSelectedSeats(seats: string[]) {
      this.selectedSeats = seats;
      this.bookingDetailsSubject.next({
        movie: this.selectedMovie,
        seats,
        date: new Date().toLocaleString(),
      });
      if (typeof window !== 'undefined') {
        localStorage.setItem('bookingDetails', JSON.stringify(this.bookingDetailsSubject.getValue()));
      }
    }

    setSelectedMovie(movie: any) {
      this.selectedMovie = movie;
      if (typeof window !== 'undefined') {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
      }
    }

    createTicket(ticketData: any): Observable<any> {
      return this.http.post(`${this.baseUrl}/api/tickets`, ticketData);
    }
  }


