import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';
@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  constructor(private router: Router, private authService: AuthService) {}

  navigateToQuiz() {
    if (this.authService.isLoggedIn) {
      // Navigate to explore quiz page if logged in
      this.router.navigate(['/explore-quiz']);
    } else {
      // Navigate to sign-in page if not logged in
      this.router.navigate(['/signin']);
    }
  }
}
