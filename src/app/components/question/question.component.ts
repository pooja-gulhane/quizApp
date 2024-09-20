import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/services/question-service/question.service';
import { ActivatedRoute } from '@angular/router';
import { ApplicationUserDTO } from 'src/app/models/question/nextAndPreviousQuestion/applicationUserDTO';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { QuestionDTO } from 'src/app/models/question/nextAndPreviousQuestion/questionDTO';
import { QuizDetail } from 'src/app/models/quiz';
import { SubmitUserResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/submitUserResponseDTO';
import { CurrentAndNextResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/currentAndNextResponseDTO';
import { CurrentAndPreviousResponseDTO } from 'src/app/models/question/nextAndPreviousQuestion/currentAndPreviousResponseDTO';
import { Router } from '@angular/router';
import { ScoreService } from 'src/app/services/score-service/score.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  questions: any[] = [];
  quizId!: number;
  userId: number = 0;
  currentQuestionIndex: number = 0;   
  selectedAnswer: string = '';

  constructor(
    private scoreService: ScoreService,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.quizId = +this.route.snapshot.paramMap.get('quizId')!;
    this.userId = this.authService.userProfile.userDTO.applicationUserId;
    this.questionService.getQuestionsByQuiz(this.quizId, this.userId).subscribe(
      response => {
        this.questions = response.data;
        console.log(response);
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

      let quizDTO: QuizDetail = {
        quizId:this.quizId,
        quizName:'',
        quizNoOfQuestions:0,
        quizTimeAllocated:0,
        quizTotalMarks:0,
        quizImage:''
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
          if (error.error.message === "Response doesn't exist") {
            // Reset selectedAnswer to unselect all options
            this.selectedAnswer = '';
          } else {
            console.error('Error fetching next question', error);
          }        
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

    let quizDTO: QuizDetail = {
      quizId:this.quizId,
      quizName:'',
      quizNoOfQuestions:0,
      quizTimeAllocated:0,
      quizTotalMarks:0,
      quizImage:''
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
          if (error.error.message === "Response doesn't exist") {
            // Reset selectedAnswer to unselect all options
            this.selectedAnswer = '';
          } else {
            console.error('Error fetching next question', error);
          }        
        }
      );
    }
  }

  submitQuiz(questionIndex:any):void {
    // SweetAlert2 confirmation dialog
    Swal.fire({
      title: 'Are you sure you want to submit?',
      text: 'You will not be able to change your answers!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onSubmit(questionIndex);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If user clicks "Cancel", just close the dialog
        Swal.fire('Submission cancelled', '', 'info');
      }
    });
  }

  onSubmit(questionIndex: any): void {
    
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

    let quizDTO: QuizDetail = {
      quizId:this.quizId,
      quizName:'',
      quizNoOfQuestions:0,
      quizTimeAllocated:0,
      quizTotalMarks:0,
      quizImage:''
    }

    let currentResponse: SubmitUserResponseDTO = {
      applicationUser: applicationUserDTO,
      question: currentQuestion,
      quiz: quizDTO,
      userResponseAns: this.selectedAnswer
    }

    let nextResponse: SubmitUserResponseDTO = {
      applicationUser: applicationUserDTO,
      question: currentQuestion,
      quiz: quizDTO,
      userResponseAns: ''
    }

    let currentAndNextResponseDTO: CurrentAndNextResponseDTO = {
      currentResponse: currentResponse,
      nextResponse: nextResponse
    }



    this.questionService.submitUserResponses(currentAndNextResponseDTO).subscribe(
      response => {
        console.log('Responses submitted successfully:', response);

        // Retrieve the score from the response and navigate to the ScoreComponent
        const scoreValue = response.data.scoreValue;

        this.scoreService.setScore(scoreValue);  // Store score in the service
        this.router.navigate(['/score',this.quizId]);
        // Navigate to the score component and pass the score in the state
        //this.router.navigate(['/score', quizId], { state: { score: scoreValue } });
      },
      error => {
        console.error('Error submitting responses', error);
      }
    );
}

//for getting the option selected when clicked anywhere
selectAnswer(option: string) {
  this.selectedAnswer = option; // Set the selected answer
}

}
