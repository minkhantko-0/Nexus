import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../user-data.model';
import { AuthService } from '../../login/auth.service';
import { Router } from '@angular/router';
import { UserDataService } from '../user-data.service';

@Component({
    selector: 'app-add-friend',
    templateUrl: './add-friend.component.html',
    styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {
    isRemoved: string[] = [];
    isAddedFriend: string[] = [];
    isLoading = false;
    token: string | null | undefined;
    peopleYouMayKnow: UserData[] | undefined;
    error = '';

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router,
        private userDataService: UserDataService
    ) {}

    ngOnInit(): void {
        this.token = localStorage.getItem('access_token');
        if (this.token) {
            this.isLoading = true;
            this.http
                .get<UserData[]>(
                    'https://nexus-project-api.herokuapp.com/people_you_may_know',
                    {
                        headers: { authorization: this.token },
                    }
                )
                .subscribe(
                    (res) => {
                        this.peopleYouMayKnow = res;
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

    onRemove(userId: string) {
        this.isRemoved.push(userId);
        if (this.token) {
            this.userDataService.removePerson(userId, this.token).subscribe(
                (res) => {},
                (error) => {
                    this.error = error.message;
                }
            );
        }
    }

    onAddFriend(userId: string) {
        this.isAddedFriend.push(userId);
        if (this.token) {
            this.userDataService.addFriend(userId, this.token).subscribe(
                (res) => {},
                (error) => {
                    this.error = error.message;
                }
            );
        }
    }
}
