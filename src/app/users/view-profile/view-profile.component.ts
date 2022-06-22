import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data.model';
import { AuthService } from '../../login/auth.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { UserDataService } from '../user-data.service';
import { UserRequest } from '../user-request.model';

@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {
    user = new UserData(
        { url: '' },
        '',
        [],
        '',
        '',
        '',
        [],
        [],
        [],
        '',
        '',
        '',
        '',
        0,
        '',
        []
    );
    userId = '';
    isLoading = false;
    isAccepted = false;
    isAddedFriend = false;
    isRemovedFriend = false;
    friendRequests: string[] = [];
    requestedFriends: string[] = [];
    friends: string[] = [];
    error = '';

    constructor(
        private authService: AuthService,
        private userDataService: UserDataService,
        public location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        const logInUserId = localStorage.getItem('userId');
        if (logInUserId) {
            this.userId = logInUserId;
        }
        const userId = localStorage.getItem('onViewUserId');
        const token = localStorage.getItem('access_token');
        if (userId && token) {
            this.authService.onGetCreatedUser(token).subscribe(
                (res) => {
                    this.requestedFriends = res.friend_requests.map(
                        (obj) => obj._id
                    );
                },
                (error) => {}
            );
            this.authService.viewOtherUser(userId, token).subscribe(
                (res) => {
                    this.isLoading = false;
                    this.user = res;
                    this.authService.currentlyViewingUser = res;
                    this.friendRequests = res.friend_requests.map(
                        (obj) => obj._id
                    );
                    this.friends = res.friends.map((obj) => obj._id);
                },
                (error) => {
                    this.isLoading = false;
                    this.error = error.message;
                }
            );
        }
    }

    onBlockUser() {
        let dialogRef = this.dialog.open(DialogBoxComponent);
        let blockUser = 'false';
        dialogRef.afterClosed().subscribe((res) => {
            blockUser = res;
            if (blockUser !== 'false') {
                const token = localStorage.getItem('access_token');
                if (token && this.user && blockUser) {
                    this.isLoading = true;
                    this.userDataService
                        .blockUser(this.user?._id, token)
                        .subscribe((res) => {
                            this.isLoading = false;
                            this.location.back();

                        });
                }
            }
            dialogRef.close();
        });
    }

    onAddFriend() {
        this.isAddedFriend = true;
        const token = localStorage.getItem('access_token');
        if (token && this.user) {
            this.userDataService.addFriend(this.user?._id, token).subscribe(
                (res) => {},
                (error) => {
                    this.error = error.message;
                }
            );
        }
    }

    onAcceptFriend() {
        this.isAccepted = true;
        const token = localStorage.getItem('access_token');
        if (token) {
            this.userDataService
                .acceptFriendRequest(this.user._id, token)
                .subscribe(
                    (res) => {},
                    (error) => {
                        this.error = error.message;
                    }
                );
        }
    }

    onUnfriend() {
        this.isRemovedFriend = true;
        let dialogRef = this.dialog.open(DialogBoxComponent);
        let removeFriend = 'false';
        dialogRef.afterClosed().subscribe((res) => {
            removeFriend = res;
            if (removeFriend !== 'false') {
                const token = localStorage.getItem('access_token');
                if (token && this.user && removeFriend) {
                    this.isLoading = true;
                    this.userDataService
                        .unfriendUser(this.user?._id, token)
                        .subscribe((res) => {
                            this.isLoading = false;
                        });
                }
            }
            dialogRef.close();
        });
    }
}
