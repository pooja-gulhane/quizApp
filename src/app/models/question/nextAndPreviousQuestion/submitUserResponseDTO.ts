import { quiz } from "../../quiz";
import { ApplicationUserDTO } from "./applicationUserDTO";
import { QuestionDTO } from "./questionDTO";

export class SubmitUserResponseDTO{
    applicationUser : ApplicationUserDTO;
    question: QuestionDTO;
    quiz: quiz;
    userResponseAns: string;

    constructor()
    {
        this.applicationUser = new ApplicationUserDTO();
        this.question = new QuestionDTO();
        this.quiz = new quiz();
        this.userResponseAns = '';
    }
}
