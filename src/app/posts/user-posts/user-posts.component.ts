import { Component, OnInit } from '@angular/core';
import { PostsService } from '../posts.service';
import { Post } from '../posts.model';
import { AuthService } from '../../login/auth.service';
import { UserData } from '../../users/user-data.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-posts',
    templateUrl: './user-posts.component.html',
    styleUrls: ['./user-posts.component.scss'],
})
export class UserPostsComponent implements OnInit {
    user: UserData | undefined;
    posts: Post[] | undefined;
    isDeleted: string[] = [];
    isLoading = false;
    error = '';
    likedPostIdArray: string[] = [];
    private token = '';
    userId = '';
    isDisabledLike = false;

    constructor(
        private postsService: PostsService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        const token = localStorage.getItem('access_token');
        const id = localStorage.getItem('userId');
        if (token && id) {
            this.token = token;
            this.userId = id;
            this.postsService.getUserPosts(token).subscribe(
                (res) => {
                    this.posts = res;
                    for (let post of this.posts) {
                        if (post.is_liked) {
                            this.likedPostIdArray.push(post._id);
                        }
                    }
                    this.isLoading = false;
                },
                (error) => {
                    this.error = error.message;
                    this.isLoading = false;
                }
            );
            this.user = this.authService.passedOnData;
        }
    }

    onLike(postId: string) {
        this.isDisabledLike = true;
        this.likedPostIdArray.push(postId);
        this.postsService.like(postId, this.token).subscribe(
            (res) => {
                this.posts = this.posts?.map((post) => {
                    this.isDisabledLike = false;
                    if (post._id === postId) {
                        return { ...post, likes: post.likes + 1 };
                    }
                    return post;
                });
            },
            (error1) => {
                this.isDisabledLike = false;
                this.error = error1.message;
            }
        );
    }

    onUnlike(postId: string) {
        this.isDisabledLike = true;
        const index = this.likedPostIdArray.indexOf(postId);
        this.likedPostIdArray.splice(index, 1);
        this.postsService.unlike(postId, this.token).subscribe(
            (res) => {
                this.isDisabledLike = false;
                this.posts = this.posts?.map((post) => {
                    if (post._id === postId) {
                        return { ...post, likes: post.likes - 1 };
                    }
                    return post;
                });
            },
            (error1) => {
                this.isDisabledLike = false;
                this.error = error1.message;
            }
        );
    }

    onDeletePost(postId: string) {
        this.isDeleted.push(postId);
        const token = localStorage.getItem('access_token');
        if (token) {
            this.postsService.deletePost(postId, token).subscribe(
                (res) => {},
                (error1) => {
                    this.error = error1.message;
                }
            );
        }
    }

    onComment(postId: string) {
        localStorage.setItem('onCommentPostId', postId);
        this.router.navigate(['/comments']);
    }

    onShare(postId: string) {
        localStorage.setItem('onSharePostId', postId);
        this.router.navigate(['/share-post']);
    }
}
