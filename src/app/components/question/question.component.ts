import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUserDTO } from 'src/app/models/question/nextAndPreviousQuestion/applicationUserDTO';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { QuestionDTO } from 'src/app/models/question/nextAndPreviousQuestion/questionDTO';
import { quiz } from 'src/app/models/quiz';
import { SubmitUserResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/submitUserResponseDTO';
import { CurrentAndNextResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/currentAndNextResponseDTO';
import { CurrentAndPreviousResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/currentAndPreviousResponseDTO';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: any[] = [];
  quizId!: number;
  currentQuestionIndex: number = 0;   
  selectedAnswer: string = '';

  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Get the quizId from the route
    this.quizId = +this.route.snapshot.paramMap.get('quizId')!;

    // Fetch questions for this quiz
    this.questionService.getQuestionsByQuiz(this.quizId).subscribe(
      response => {
        this.questions = response.data;
      },
      error => {
        console.error('Error fetching questions', error);
      }
    );
  }

  // Go to the next question (Call the API)
  onNext(questionIndex: any): void {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      // Prepare the request DTO for the next question API call'
      
      console.log(this.authService.userProfile)

      let applicationUserDTO: ApplicationUserDTO = {
        applicationUserId: this.authService.userProfile.userDTO.applicationUserId,
        applicationUserFirstName:'',
        applicationUserLastName:'',
        applicationUserEmail:'',
        applicationUserPassword:'',
        applicationUserRole:''
      }

      let currentQuestion: QuestionDTO = {
        questionId:this.questions[questionIndex].questionId,
        questionDescription:'',
        questionOption1:'',
        questionOption2:'',
        questionOption3:'',
        questionOption4:'',
        questionCorrectAns: '',
        questionMarks: 0
      }

      let nextQuestion: QuestionDTO = {
        questionId:this.questions[questionIndex+1].questionId,
        questionDescription:'',
        questionOption1:'',
        questionOption2:'',
        questionOption3:'',
        questionOption4:'',
        questionCorrectAns: '',
        questionMarks: 0
      }

      let quizDTO: quiz = {
        quizId:this.quizId,
        quizName:'',
        quizNoOfQuestions:0,
        quizTimeAllocated:0,
        quizTotalMarks:0
      }

      let currentResponse: SubmitUserResponseDTO = {
        applicationUser: applicationUserDTO,
        question: currentQuestion,
        quiz: quizDTO,
        userResponseAns: this.selectedAnswer
      }

      let nextResponse: SubmitUserResponseDTO = {
        applicationUser: applicationUserDTO,
        question: nextQuestion,
        quiz: quizDTO,
        userResponseAns: ''
      }

      let currentAndNextResponseDTO: CurrentAndNextResponseDTO = {
        currentResponse: currentResponse,
        nextResponse: nextResponse
      }

      /*
        CurrentAndNextReponse object -> SubUserResponseDTO object -> ApplicationUserDTO, QuestionDTO, QuizDTO
      */

      // Call the next question API
      this.questionService.getNextQuestion(currentAndNextResponseDTO).subscribe(
        response => {
          this.currentQuestionIndex++;
          this.selectedAnswer = response.userResponseAns;  // Reset selected answer
        },
        error => {
          console.error('Error fetching next question', error);
        }
      );
    }
  }

  // Go to the previous question (Call the API)
  onPrevious(questionIndex: any): void {

  if (this.currentQuestionIndex > 0) {
      // Prepare the request DTO for the previous question API call
    console.log(this.authService.userProfile)

    let applicationUserDTO: ApplicationUserDTO = {
      applicationUserId: this.authService.userProfile.userDTO.applicationUserId,
      applicationUserFirstName:'',
      applicationUserLastName:'',
      applicationUserEmail:'',
      applicationUserPassword:'',
      applicationUserRole:''
    }

    let currentQuestion: QuestionDTO = {
      questionId:this.questions[questionIndex].questionId,
      questionDescription:'',
      questionOption1:'',
      questionOption2:'',
      questionOption3:'',
      questionOption4:'',
      questionCorrectAns: '',
      questionMarks: 0
    }

    let previousQuestion: QuestionDTO = {
      questionId:this.questions[questionIndex-1].questionId,
      questionDescription:'',
      questionOption1:'',
      questionOption2:'',
      questionOption3:'',
      questionOption4:'',
      questionCorrectAns: '',
      questionMarks: 0
    }

    let quizDTO: quiz = {
      quizId:this.quizId,
      quizName:'',
      quizNoOfQuestions:0,
      quizTimeAllocated:0,
      quizTotalMarks:0
    }

    let currentResponse: SubmitUserResponseDTO = {
      applicationUser: applicationUserDTO,
      question: currentQuestion,
      quiz: quizDTO,
      userResponseAns: this.selectedAnswer
    }

    let previousResponse: SubmitUserResponseDTO = {
      applicationUser: applicationUserDTO,
      question: previousQuestion,
      quiz: quizDTO,
      userResponseAns: ''
    }

    let currentAndPreviousResponseDTO : CurrentAndPreviousResponseDTO={
      currentResponse: currentResponse,
      previousResponse: previousResponse
    }

      // Call the previous question API
      this.questionService.getPreviousQuestion(currentAndPreviousResponseDTO).subscribe(
        response => {
          console.log(response)
          this.currentQuestionIndex--;
          this.selectedAnswer = response.userResponseAns;  // Reset selected answer
        },
        error => {
          console.error('Error fetching previous question', error);
        }
      );
    }
  }

  onSubmit(): void {
    const userId = this.authService.userProfile.userDTO.applicationUserId;
    const quizId = this.quizId;
    let scoreValue: number = 0;
    this.questionService.submitUserResponses(userId, quizId).subscribe(
      response => {
        console.log('Responses submitted successfully:', response);
        // Optionally, navigate to a results page or display a success message
        scoreValue = response.data.scoreValue
      },
      error => {
        console.error('Error submitting responses', error);
      }
    );
    this.router.navigate(['/score', quizId],{state:{score:scoreValue}});
  }
}
