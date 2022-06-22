import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './posts.model';
import { Comment } from './comments/comments.model';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    constructor(private http: HttpClient) {}

    getUserPosts(token: string) {
        return this.http.get<Post[]>(
            'https://nexus-project-api.herokuapp.com/posts',
            { headers: { authorization: token } }
        );
    }

    getAllPosts(token: string) {
        return this.http.get<Post[]>(
            'https://nexus-project-api.herokuapp.com/all_posts',
            { headers: { authorization: token } }
        );
    }

    getPost(token: string, _id: string) {
        return this.http.get<Post>(
            `https://nexus-project-api.herokuapp.com/posts/${_id}`,
            { headers: { authorization: token } }
        );
    }

    viewPosts(_id: string, token: string) {
        return this.http.get<Post[]>(
            `https://nexus-project-api.herokuapp.com/user_posts/${_id}`,
            { headers: { authorization: token } }
        );
    }

    deletePost(_id: string, token: string) {
        return this.http.delete(
            `https://nexus-project-api.herokuapp.com/posts/${_id}`,
            { headers: { authorization: token } }
        );
    }

    getComments(_id: string, token: string) {
        return this.http.get<Comment[]>(
            `https://nexus-project-api.herokuapp.com/comments/${_id}`,
            { headers: { authorization: token } }
        );
    }

    commentOnAPost(post_id: string, comment: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/commented',
            {
                post_id,
                comment,
            },
            { headers: { authorization: token } }
        );
    }

    sharePost(_id: string, token: string) {
        return this.http.post<Post>(
            'https://nexus-project-api.herokuapp.com/shared',
            { _id, token },
            { headers: { authorization: token } }
        );
    }

    like(post_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/liked',
            { post_id },
            { headers: { authorization: token } }
        );
    }

    unlike(post_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/unliked',
            { post_id },
            { headers: { authorization: token } }
        );
    }
}
