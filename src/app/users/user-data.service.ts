import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from './user-data.model';

@Injectable({
    providedIn: 'root',
})
export class UserDataService {
    constructor(private http: HttpClient) {}
    taggedFriends: string[] = [];
    addFriend(_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/request_friend',
            { _id },
            { headers: { authorization: token } }
        );
    }

    removePerson(_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/not_interested',
            { _id },
            { headers: { authorization: token } }
        );
    }

    acceptFriendRequest(_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/accept_friend_request',
            { _id },
            { headers: { authorization: token } }
        );
    }

    deleteRequest(_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/remove_friend_requests',
            { _id },
            { headers: { authorization: token } }
        );
    }

    getFriendList(token: string) {
        return this.http.get<UserData[]>(
            'https://nexus-project-api.herokuapp.com/friends',
            { headers: { authorization: token } }
        );
    }

    unfriendUser(_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/unfriend',
            {
                _id,
            },
            { headers: { authorization: token } }
        );
    }

    blockUser(_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/block',
            {
                _id,
            },
            { headers: { authorization: token } }
        );
    }

    getBlockedUsers(token: string) {
        return this.http.get<UserData[]>(
            'https://nexus-project-api.herokuapp.com/blocked_users',
            { headers: { authorization: token } }
        );
    }

    unBlockUser(_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/unblock',
            { _id },
            { headers: { authorization: token } }
        );
    }

    saveTaggedFriends(taggedFriends: string[]) {
        this.taggedFriends = taggedFriends;
    }
}
