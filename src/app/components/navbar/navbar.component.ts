import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(public authService: AuthService,public router: Router) {}

  logout(): void {
    this.authService.logout(); // Call the logout function from AuthService
    this.router.navigate(['/signin']); // Redirect to the sign-in page
  }
}
