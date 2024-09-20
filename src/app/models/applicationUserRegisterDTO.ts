export class ApplicationUserRegisterDTO{
    applicationUserId : number;
    applicationUserFirstName : string;
    applicationUserLastName : string;
    applicationUserEmail : string;
    applicationUserPassword : string;
    applicationUserRole : string;
    constructor(){
        this.applicationUserId = 0;
        this.applicationUserFirstName= '';
        this.applicationUserLastName='';
        this.applicationUserEmail='';
        this.applicationUserPassword='';
        this.applicationUserRole='';
    }
}