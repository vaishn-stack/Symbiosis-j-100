import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private router: Router) {}

  logout() {
    alert('Logging out...');
  }
  view(){
    alert('Report page comming soon...');
  }
  home(){
    this.router.navigate(['/booking']);
    //alert('Home page comming soon...');
  }
  booking(){
        this.router.navigate(['/booking']);
  }
}