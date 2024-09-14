export class QuestionDTO{
    questionId : number;
    questionDescription : string;
    questionOption1: string;
    questionOption2: string;
    questionOption3: string;
    questionOption4: string;
    questionCorrectAns: string;
    questionMarks : number;

    constructor()
    {
        this.questionId = 0;
        this.questionDescription = '';
        this.questionOption1= '';
        this.questionOption2='';
        this.questionOption3='';
        this.questionOption4='';
        this.questionCorrectAns='';
        this.questionMarks= 0;
    }
}
