import { UserRequest } from './user-request.model';

export class UserData {
    public avatar: { url: string };
    public bio: string;
    public blocked_users: [];
    public createdAt: string;
    public dateOfBirth: string;
    public email: string;
    public friend_requests: UserRequest[];
    public requested_users: UserRequest[];
    public friends: UserRequest[];
    public hometown: string;
    public name: string;
    private password: string;
    public updatedAt: string;
    public __v: 0;
    public _id: string;
    public not_interested_user: [];

    constructor(
        avatar: { url: string },
        bio: string,
        blocked_users: [],
        createdAt: string,
        dateOfBirth: string,
        email: string,
        friend_requests: [],
        requested_users: [],
        friends: [],
        hometown: string,
        name: string,
        password: string,
        updatedAt: string,
        __v: 0,
        _id: string,
        not_interested_user: []
    ) {
        this.avatar = avatar;
        this.bio = bio;
        this.blocked_users = blocked_users;
        this.createdAt = createdAt;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.friend_requests = friend_requests;
        this.requested_users = requested_users;
        this.friends = friends;
        this.hometown = hometown;
        this.name = name;
        this.password = password;
        this.updatedAt = updatedAt;
        this.__v = __v;
        this._id = _id;
        this.not_interested_user = not_interested_user;
    }
}
