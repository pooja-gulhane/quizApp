import { SubmitUserResponseDTO } from "./submitUserResponseDTO";

export class CurrentAndNextResponseDTO{
    currentResponse: SubmitUserResponseDTO;
    nextResponse: SubmitUserResponseDTO;

    constructor()
    {
        this.currentResponse = new SubmitUserResponseDTO();
        this.nextResponse = new SubmitUserResponseDTO();
    }
}