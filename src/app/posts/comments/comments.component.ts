import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { PostsService } from '../posts.service';
import { Comment } from './comments.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
    comments: Comment[] | undefined;
    error = '';

    constructor(
        public location: Location,
        private postsService: PostsService,
        private router: Router
    ) {}

    ngOnInit(): void {
        const postId = localStorage.getItem('onCommentPostId');
        const token = localStorage.getItem('access_token');
        if (postId && token) {
            this.postsService.getComments(postId, token).subscribe(
                (res) => {
                    this.comments = res;
                },
                (error) => {
                    this.error = error.message;
                    location.reload();
                }
            );
        }
    }

    onComment(comment: string) {
        const postId = localStorage.getItem('onCommentPostId');
        const token = localStorage.getItem('access_token');
        if (postId && token) {
            this.postsService.commentOnAPost(postId, comment, token).subscribe(
                (res) => {
                    this.ngOnInit();
                },
                (error) => {
                    this.error = error;
                }
            );
        }
    }

    viewProfile(userId: string) {
        localStorage.setItem('onViewUserId', userId);
        const id = localStorage.getItem('userId');
        if (userId === id) {
            this.router.navigate(['/user']);
        } else this.router.navigate(['/view-profile']);
    }
}
