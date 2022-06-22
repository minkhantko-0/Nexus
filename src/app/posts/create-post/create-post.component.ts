import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../login/auth.service';
import { UserData } from '../../users/user-data.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from '../posts.model';
import { UserDataService } from '../../users/user-data.service';
import { Location } from '@angular/common';
import { GroupDataService } from '../../groups/group-data.service';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
    isLoading = false;
    isGroupPost = false;
    user: UserData | undefined;
    token: string | null | undefined;
    error = '';
    image: any;
    imageUrl: string | undefined;
    taggedFriends: string[] = [];

    constructor(
        private authService: AuthService,
        private router: Router,
        private http: HttpClient,
        private userDataService: UserDataService,
        public location: Location,
        private groupDataService: GroupDataService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        const groupPost = localStorage.getItem('isGroupPost');
        if (groupPost === 'true') {
            this.isGroupPost = true;
        }
        this.token = localStorage.getItem('access_token');
        if (this.token) {
            this.taggedFriends = this.userDataService.taggedFriends;
            this.authService.onGetCreatedUser(this.token).subscribe(
                (res) => {
                    this.user = res;
                    this.isLoading = false;
                },
                (error) => {
                    this.error = error.error.message;
                    this.isLoading = false;
                }
            );
        }
    }

    onUpload(event: Event) {
        const { files } = event.target as HTMLInputElement;
        if (files && files.length) {
            const image = files.item(0);
            const reader = new FileReader();
            reader.onload = (data: any) => {
                const imageURl = data.target.result;
                this.image = image;
                this.imageUrl = imageURl;
            };
            if (image) {
                reader.readAsDataURL(image);
            }
        }
    }

    onTagFriends() {
        localStorage.setItem('isTaggingFriends', 'true');
        this.router.navigate(['/friend-list']);
    }

    onCreatePost(postContentText: string) {
        const postData = new FormData();
        postData.append('body', postContentText);
        postData.append('image', this.image);
        if (!this.isGroupPost) {
            for (let i = 0; i < this.taggedFriends.length; i++) {
                postData.append('tagFriends', this.taggedFriends[i]);
            }
            if (this.token) {
                this.isLoading = true;
                this.http
                    .post<Post>(
                        'https://nexus-project-api.herokuapp.com/posts',
                        postData,
                        { headers: { authorization: this.token } }
                    )
                    .subscribe(
                        (res) => {
                            this.isLoading = false;
                            this.userDataService.taggedFriends = [];
                            this.router.navigate(['/home']);
                        },
                        (error) => {
                            this.isLoading = false;
                            this.error = error.error.message + 'Try Again?';
                            setTimeout(() => {
                                this.router.navigate(['/create-post']);
                            }, 3000);
                        }
                    );
            }
        } else {
            const groupId = localStorage.getItem('onViewGroupId');
            if (groupId && this.token) {
                postData.append('group', groupId);
                this.isLoading = true;
                this.groupDataService
                    .postInGroup(postData, this.token)
                    .subscribe(
                        (res) => {
                            console.log(res);
                            this.location.back();
                            this.isLoading = false;
                        },
                        (error) => {
                            this.error = error.message;
                            this.isLoading = false;
                        }
                    );
            }
        }
    }

    ngOnDestroy() {
        localStorage.removeItem('isGroupPost');
    }
}
