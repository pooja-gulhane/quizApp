export class UserProfile {
    applicationUserId: number
    applicationUserName: string
    applicationUserEmail: string
    applicationUserPassword: string
    applicationUserRole: string;

    constructor() {
        this.applicationUserId = 0,
        this.applicationUserName = ''
        this.applicationUserEmail = ''
        this.applicationUserPassword = ''
        this.applicationUserRole = ''
    }
}
