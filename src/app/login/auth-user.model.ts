export class AuthUser {
    constructor(
        public email: string,
        public password: string,
        public _id: string,
        private token: string
    ) {}
    getToken() {
        return this.token;
    }
}
