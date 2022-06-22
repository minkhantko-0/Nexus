import { UserData } from '../../users/user-data.model';

export class Comment {
    public user: UserData;
    public comment: string;
    public commented_at: string;
    public _id: string;

    constructor(
        user: UserData,
        comment: string,
        commented_at: string,
        _id: string
    ) {
        this.user = user;
        this.comment = comment;
        this.commented_at = commented_at;
        this._id = _id;
    }
}
