import { Component, OnInit } from '@angular/core';
import { UserData } from '../../users/user-data.model';
import { Post } from '../posts.model';
import { PostsService } from '../posts.service';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-view-posts',
    templateUrl: './view-posts.component.html',
    styleUrls: ['./view-posts.component.scss'],
})
export class ViewPostsComponent implements OnInit {
    user: UserData | undefined;
    posts: Post[] | undefined;
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
        const token = localStorage.getItem('access_token');
        const userId = localStorage.getItem('onViewUserId');

        if (token && userId) {
            this.token = token;
            this.isLoading = true;
            this.authService.viewOtherUser(userId, token).subscribe(
                (res) => {
                    this.user = res;
                },
                (error) => {
                    this.error = error.message;
                }
            );
            this.postsService.viewPosts(userId, token).subscribe(
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
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            );
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

    onComment(postId: string) {
        localStorage.setItem('onCommentPostId', postId);
        this.router.navigate(['/comments']);
    }

    onShare(potsId: string) {
        localStorage.setItem('onSharePostId', potsId);
        this.router.navigate(['/share-post']);
    }
}
