import { SubmitUserResponseDTO } from "./submitUserResponseDTO";

export class CurrentAndPreviousResponseDTO{
    currentResponse: SubmitUserResponseDTO;
    previousResponse: SubmitUserResponseDTO;
    constructor()
    {
        this.currentResponse = new SubmitUserResponseDTO();
        this.previousResponse = new SubmitUserResponseDTO();
    }
}
