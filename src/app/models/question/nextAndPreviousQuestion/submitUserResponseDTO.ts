import { QuizDetail } from "../../quiz";
import { ApplicationUserDTO } from "./applicationUserDTO";
import { QuestionDTO } from "./questionDTO";

export class SubmitUserResponseDTO{
    applicationUser : ApplicationUserDTO;
    question: QuestionDTO;
    quiz: QuizDetail;
    userResponseAns: string;

    constructor()
    {
        this.applicationUser = new ApplicationUserDTO();
        this.question = new QuestionDTO();
        this.quiz = new QuizDetail();
        this.userResponseAns = '';
    }
}
