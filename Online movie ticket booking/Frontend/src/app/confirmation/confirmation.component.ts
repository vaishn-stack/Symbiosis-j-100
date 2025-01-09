
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../booking.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-confirmation',
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css',
})
export class ConfirmationComponent implements OnInit {
  bookingDetails: any;
  qrCodeDataUrl: string = '';

  constructor(private router: Router, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookingDetails = this.bookingService.getBookingDetails();
    this.generateQRCode(JSON.stringify(this.bookingDetails));

  }

  resetBooking() {
    this.bookingService.resetBooking();
    alert('Your booking has been reset.');
    this.router.navigate(['/booking']);
  }

  async generateQRCode(text: string): Promise<void> {
    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(text);
    } catch (err) {
      console.error('Error generating QR Code', err);
    }
  }

  async downloadPDF() {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Booking Confirmation', 20, 20);

    doc.setFontSize(14);
      doc.text(`Movie: ${this.bookingDetails.movie?.name || 'N/A'}`, 20, 30);
        doc.text(`Seats: ${this.bookingDetails.seats?.join(', ') || 'N/A'}`, 20, 40);
        doc.text(`Date: ${this.bookingDetails.date || 'N/A'}`, 20, 50);
    

    if (this.qrCodeDataUrl) {
      const imgProps = { imageData: this.qrCodeDataUrl, format: 'PNG', x: 20, y: 60, width: 50, height: 50 };
      doc.addImage(imgProps.imageData, imgProps.format, imgProps.x, imgProps.y, imgProps.width, imgProps.height);
    }
    doc.save('ticket-receipt.pdf');
  }

  downloadQRCode() {
    if (this.qrCodeDataUrl) {
      const link = document.createElement('a');
      link.href = this.qrCodeDataUrl;
      link.download = 'booking-qr-code.png';
      link.click();
    }
  }
} 