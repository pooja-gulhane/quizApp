import { Component, OnInit, ElementRef, Renderer2, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent  implements AfterViewInit{

  testimonials = [
    {
      img: 'assets/womanTest.png',
      message: 'QuizGrad made creating and managing quizzes incredibly easy. My students are more engaged than ever!',
      name: 'Marnus Stephen'
    },
    {
      img: 'assets/manTest.png',
      message: "This app transformed how I assess my students' progress. Highly recommended!",
      name: 'Andrew Jettpace'
    },
    {
      img: 'assets/womanTest2.png',
      message: 'The user-friendly interface and powerful features are a game-changer for both teachers and students.',
      name: 'Stacy Stone'
    }
  ];

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const cards = this.el.nativeElement.querySelectorAll('.card');

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.removeClass(entry.target, 'animate-hidden');
            this.renderer.addClass(entry.target, 'animate');
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1 } 
    );

    cards.forEach((card: any) => {
      this.renderer.addClass(card, 'animate-hidden');
      observer.observe(card);
    });
  }
}


