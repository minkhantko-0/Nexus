import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from './group.model';
import { UserData } from '../users/user-data.model';
import { Post } from '../posts/posts.model';

@Injectable({
    providedIn: 'root',
})
export class GroupDataService {
    constructor(private http: HttpClient) {}

    createGroup(groupData: FormData, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/groups',
            groupData,
            { headers: { authorization: token } }
        );
    }

    getCreatedGroups(token: string) {
        return this.http.get<Group[]>(
            'https://nexus-project-api.herokuapp.com/groups',
            { headers: { authorization: token } }
        );
    }

    getGroupById(_id: string, token: string) {
        return this.http.get<Group>(
            `https://nexus-project-api.herokuapp.com/groups/${_id}`,
            { headers: { authorization: token } }
        );
    }

    getJoinedGroups(token: string) {
        return this.http.get<Group[]>(
            'https://nexus-project-api.herokuapp.com/joined_groups',
            { headers: { authorization: token } }
        );
    }

    deleteGroup(token: string, _id: string) {
        return this.http.delete(
            `https://nexus-project-api.herokuapp.com/groups/${_id}`,
            {
                headers: { authorization: token },
            }
        );
    }

    requestToJoin(group: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/request_group',
            { group },
            { headers: { authorization: token } }
        );
    }

    leaveGroup(group_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/leave_group',
            { group_id },
            { headers: { authorization: token } }
        );
    }

    acceptRequestToJoin(user_id: string, group_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/accept_member',
            { user_id, group_id },
            { headers: { authorization: token } }
        );
    }

    rejectRequestToJoin(user_id: string, group_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/accept_member/remove_request_member',
            { group_id, user_id },
            { headers: { authorization: token } }
        );
    }

    removeMemberFromGroup(user_id: string, group_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/remove_member',
            { user_id, group_id },
            { headers: { authorization: token } }
        );
    }

    getJoinRequests(_id: string, token: string) {
        return this.http.get<UserData[]>(
            `https://nexus-project-api.herokuapp.com/requested_members/${_id}`,
            { headers: { authorization: token } }
        );
    }

    getMemberList(_id: string, token: string) {
        return this.http.get<UserData[]>(
            `https://nexus-project-api.herokuapp.com/members/${_id}`,
            { headers: { authorization: token } }
        );
    }

    postInGroup(postData: FormData, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/posts',
            postData,
            { headers: { authorization: token } }
        );
    }

    getGroupPosts(_id: string, token: string) {
        return this.http.get<Post[]>(
            `https://nexus-project-api.herokuapp.com/group_posts/${_id}`,
            { headers: { authorization: token } }
        );
    }
}
