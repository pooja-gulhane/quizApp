import { Component, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {
  constructor(private el: ElementRef,private router: Router, private authService: AuthService) { }

  navigateToQuiz() {
    if (this.authService.isLoggedIn) {
      // Navigate to explore quiz page if logged in
      this.router.navigate(['/explore-quiz']);
    } else {
      // Navigate to sign-in page if not logged in
      this.router.navigate(['/signin']);
    }
  }


  @HostListener('window:scroll', ['$event']) // Listen to the scroll event
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    // If the image is in view, add 'in-view' class to the left-part
    if (scrollPosition > componentPosition + 100) { // Buffer of 100px for smooth triggering
      this.el.nativeElement.querySelector('.left-part').classList.add('in-view');
    }
  }
}
