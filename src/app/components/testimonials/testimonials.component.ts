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
      message: 'We had a great time collaborating with the Filament team. They have my high recommendation!',
      name: 'Marnus Stephen'
    },
    {
      img: 'assets/manTest.png',
      message: "The team drastically improved our product's user experience & increased our business outreach.",
      name: 'Andrew Jettpace'
    },
    {
      img: 'assets/womanTest2.png',
      message: 'I absolutely loved working with the Filament team. Complete experts at what they do!',
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
            observer.unobserve(entry.target); // Stop observing once animation is triggered
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    cards.forEach((card: any) => {
      this.renderer.addClass(card, 'animate-hidden');
      observer.observe(card);
    });
  }
}


// import { Component, OnInit, AfterViewInit } from '@angular/core';

// @Component({
//   selector: 'app-testimonials',
//   templateUrl: './testimonials.component.html',
//   styleUrls: ['./testimonials.component.css']
// })
// export class TestimonialsComponent implements OnInit, AfterViewInit {

//   testimonials = [
//     {
//       image: 'assets/womanTest.png', 
//       text: 'This quiz platform helped me prepare for my exams in the most efficient way possible. The questions are top-notch!',
//       author: 'Emily Johnson',
//     },
//     {
//       image: 'assets/manTest.png', 
//       text: 'I love how intuitive and user-friendly the quizzes are. They’re a great way to learn new topics quickly!',
//       author: 'Michael Smith',
//     },
//     {
//       image: 'assets/womanTest2.png', 
//       text: 'The variety of quizzes available really impressed me. I enjoyed taking them and learned a lot in the process.',
//       author: 'Sarah Williams',
//     }
//   ];

//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     const observer = new IntersectionObserver(entries => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('animate'); // Add the animation class
//         }
//       });
//     });

//     const elements = document.querySelectorAll('.testimonial-box');
//     elements.forEach(el => observer.observe(el));
//   }
// }




