import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Post } from '../posts.model';
import { AuthService } from '../../login/auth.service';
import { UserData } from '../../users/user-data.model';
import { PostsService } from '../posts.service';
import { Router } from '@angular/router';
import { UserDataService } from '../../users/user-data.service';

@Component({
    selector: 'app-share-post',
    templateUrl: './share-post.component.html',
    styleUrls: ['./share-post.component.scss'],
})
export class SharePostComponent implements OnInit {
    isLoading = false;
    error = '';
    sharingUser: UserData | undefined;
    sharePost: Post | undefined;
    private token: string | null | undefined;

    constructor(
        public location: Location,
        private authService: AuthService,
        private postsService: PostsService,
        private router: Router,
        private userDataService: UserDataService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.token = localStorage.getItem('access_token');
        const postId = localStorage.getItem('onSharePostId');
        if (this.token && postId) {
            this.authService.onGetCreatedUser(this.token).subscribe(
                (res) => {
                    this.sharingUser = res;
                },
                (error) => {
                    this.error = error.message;
                }
            );
            this.postsService.getPost(this.token, postId).subscribe(
                (res) => {
                    this.sharePost = res;
                    this.isLoading = false;
                },
                (error) => {
                    this.error = error.message;
                    this.isLoading = false;
                }
            );
        }
    }

    onSharePost() {
        this.isLoading = true;
        const postId = localStorage.getItem('onSharePostId');
        if (this.token && postId) {
            this.postsService.sharePost(postId, this.token).subscribe(
                (res) => {
                    this.sharePost = res;
                    this.location.back();
                },
                (error) => {
                    this.isLoading = false;
                    this.error = error.message;
                }
            );
        }
    }
}
