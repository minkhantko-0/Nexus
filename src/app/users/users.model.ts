import { Post } from '../posts/posts.model';

export class User {
    public email: string;
    public username: string;
    public imgSrc: string;
    public hometown: string;
    public birthday: string;
    public bio: string;
    public friends?: User[];
    public friendRequests?: [];
    public joinedGroups?: [];
    public sharedPosts?: Post[];
    public blockedUsers?: User[];

    constructor(
        email: string,
        username: string,
        imgSrc: string,
        hometown: string,
        birthday: string,
        bio: string,
        friends?: User[],
        friendRequests?: [],
        joinedGroups?: [],
        sharedPosts?: Post[],
        blockedUsers?: User[]
    ) {
        this.email = email;
        this.username = username;
        this.hometown = hometown;
        this.imgSrc = imgSrc;
        this.birthday = birthday;
        this.bio = bio;
        this.friends = friends;
        this.friendRequests = friendRequests;
        this.blockedUsers = blockedUsers;
        this.sharedPosts = sharedPosts;
        this.joinedGroups = joinedGroups;
    }
}
