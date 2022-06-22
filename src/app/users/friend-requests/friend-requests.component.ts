import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';
import { UserData } from '../user-data.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-friend-requests',
    templateUrl: './friend-requests.component.html',
    styleUrls: ['./friend-requests.component.scss'],
})
export class FriendRequestsComponent implements OnInit {
    isDeleted: string[] = [];
    isAccepted: string[] = [];
    error = '';
    isLoading = false;
    token: string | undefined | null;
    friendRequests: UserData[] | undefined;

    constructor(
        private userDataService: UserDataService,
        private authService: AuthService,
        private router: Router,
        private http: HttpClient
    ) {}

    ngOnInit(): void {
        this.token = localStorage.getItem('access_token');
        if (this.token) {
            this.isLoading = true;
            this.http
                .get<UserData[]>(
                    'https://nexus-project-api.herokuapp.com/friend_requests',
                    {
                        headers: { authorization: this.token },
                    }
                )
                .subscribe(
                    (res) => {
                        this.friendRequests = res;
                        this.isLoading = false;
                    },
                    (error) => {
                        this.error = error.message;
                        this.isLoading = false;
                    }
                );
        }
    }

    onAcceptRequest(userId: string) {
        this.isAccepted.push(userId);
        if (this.token) {
            this.userDataService
                .acceptFriendRequest(userId, this.token)
                .subscribe(
                    (res) => {},
                    (error) => {
                        this.error = error.message;
                        setTimeout(() => {
                            location.reload();
                        }, 3000);
                    }
                );
        }
    }

    onDeleteRequest(userId: string) {
        this.isDeleted.push(userId);
        if (this.token) {
            this.userDataService.deleteRequest(userId, this.token).subscribe(
                (res) => {},
                (error) => {
                    this.error = error.message;
                    setTimeout(() => {
                        location.reload();
                    }, 3000);
                }
            );
        }
    }

    viewProfile(userId: string) {
        if (this.token) {
            this.isLoading = true;
            this.authService.viewOtherUser(userId, this.token).subscribe(
                (res) => {
                    this.authService.currentlyViewingUser = res;
                    localStorage.setItem(
                        'onViewUserId',
                        this.authService.currentlyViewingUser._id
                    );
                    this.isLoading = false;
                    this.router.navigate(['/view-profile']);
                },
                (error) => {
                    this.error = error.message;
                    this.isLoading = false;
                    setTimeout(() => {
                        this.router.navigate(['/add-friend']);
                    }, 3000);
                }
            );
        }
    }


}
