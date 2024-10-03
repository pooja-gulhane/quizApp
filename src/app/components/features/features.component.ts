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
      this.router.navigate(['/explore-quiz']);
    } else {
      this.router.navigate(['/signin']);
    }
  }


  @HostListener('window:scroll', ['$event']) 
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    if (scrollPosition > componentPosition + 100) { 
      this.el.nativeElement.querySelector('.left-part').classList.add('in-view');
    }
  }
}
