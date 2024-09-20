import { ApplicationUserDTO } from "../question/nextAndPreviousQuestion/applicationUserDTO";
import { QuizDetail } from "../quiz";

export class QuizHistoryDTO{
    scoreValue : number;
    quizDetails: QuizDetail;
    applicationUser: ApplicationUserDTO;
    quizTakenDate :Date;

    constructor()
    {
        this.scoreValue = 0;
        this.quizDetails = new QuizDetail();
        this.applicationUser = new ApplicationUserDTO();
        this.quizTakenDate = new Date();
    }
}