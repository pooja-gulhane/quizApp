export class QuizDetail {
    quizId: number;
    quizNoOfQuestions: number;
    quizTotalMarks: number;
    quizName: string;
    quizTimeAllocated : number;
    quizImage: string

    constructor() {
        this.quizId = 0;
        this.quizNoOfQuestions = 0;
        this.quizTotalMarks = 0;
        this.quizName = "";
        this.quizTimeAllocated=0;
        this.quizImage='';
    }
}