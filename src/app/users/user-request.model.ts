export class UserRequest {
    public _id: string;
    public requestedAt?: string;

    constructor(_id: string, requestedAt?: string) {
        this._id = _id;
        this.requestedAt = requestedAt;
    }
}
