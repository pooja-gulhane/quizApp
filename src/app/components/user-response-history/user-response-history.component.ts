import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserResponseService } from 'src/app/services/user-response-service/user-response-service';

@Component({
  selector: 'app-user-response-history',
  templateUrl: './user-response-history.component.html',
  styleUrls: ['./user-response-history.component.css']
})
export class UserResponseHistoryComponent implements OnInit {
  userId!: number;
  quizId!: number;
  userResponses: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private userResponseService: UserResponseService
  ) {}

  ngOnInit(): void {
    // Retrieve quizId and userId from the route
    this.quizId = Number(this.route.snapshot.paramMap.get('quizId'));
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    // Call the API to get user responses for the quiz
    this.userResponseService.getUserResponsesByQuizAndUser(this.quizId, this.userId)
      .subscribe((responses) => {
        console.log(responses);
        this.userResponses = responses;
      });
  }
}
