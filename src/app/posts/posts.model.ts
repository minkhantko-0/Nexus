import { UserData } from '../users/user-data.model';

export class Post {
    public image: string;
    public _id: string;
    public body: string;
    public createdAt: string;
    public updatedAt: string;
    public user: UserData;
    public likes: number;
    public is_liked: boolean;
    public shared_user?: UserData;
    public tagFriends?: UserData[];
    public liked_users?: UserData[];
    public comments?: [];

    constructor(
        image: string,
        _id: string,
        body: string,
        user: UserData,
        createdAt: string,
        updatedAt: string,
        likes: number,
        is_liked: boolean,
        shared_user?: UserData,
        tagFriends?: UserData[],
        liked_users?: UserData[],
        comments?: []
    ) {
        this.body = body;
        this.image = image;
        this.user = user;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.likes = likes;
        this.is_liked = is_liked;
        this.shared_user = user;
        this.tagFriends = tagFriends;
        this.liked_users = liked_users;
        this.comments = comments;
        this._id = _id;
    }
}
