import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent {
  quizId!: number;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the quizId from the route params
    this.quizId = +this.route.snapshot.paramMap.get('quizId')!;
  }

  startQuiz() {
    // Navigate to the quiz questions page
    this.router.navigate(['/quiz/questions', this.quizId]);
  }

  cancel() {
    // Navigate back to the quizzes list page
    this.router.navigate(['/explore-quiz']);
  }
}
