import { Component, OnInit } from '@angular/core';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-newsfeed-posts',
    templateUrl: './newsfeed-posts.component.html',
    styleUrls: ['./newsfeed-posts.component.scss'],
})
export class NewsfeedPostsComponent implements OnInit {
    posts: Post[] | undefined;
    isLoading = false;
    error = '';
    userId = '';
    private token = '';
    likedPostIdArray: string[] = [];
    isDisabledLike = false;

    constructor(private postsService: PostsService, private router: Router) {}

    ngOnInit(): void {
        this.isLoading = true;
        const token = localStorage.getItem('access_token');
        const userId = localStorage.getItem('userId');
        if (token && userId) {
            this.token = token;
            this.userId = userId;
            this.postsService.getAllPosts(token).subscribe(
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
        }
    }

    viewProfile(userId: string) {
        localStorage.setItem('onViewUserId', userId);
        this.router.navigate(['/view-profile']);
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

    onComment(postId: string) {
        localStorage.setItem('onCommentPostId', postId);
        this.router.navigate(['/comments']);
    }

    onShare(postId: string) {
        if (postId) {
            localStorage.setItem('onSharePostId', postId);
            this.router.navigate(['/share-post']);
        }
    }
}
