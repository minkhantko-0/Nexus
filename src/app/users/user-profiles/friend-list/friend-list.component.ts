import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user-data.service';
import { UserData } from '../../user-data.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-friend-list',
    templateUrl: './friend-list.component.html',
    styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent implements OnInit {
    private token: string | null | undefined;
    friends: UserData[] | undefined;
    isTaggingFriends: string | null | undefined;
    error = '';
    isLoading = false;
    isRemoved: string[] = [];
    isBlocked: string[] = [];
    isTagged: string[] = [];

    constructor(
        private userDataService: UserDataService,
        private router: Router,
        public location: Location,
        public dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        this.isTaggingFriends = localStorage.getItem('isTaggingFriends');
        this.token = localStorage.getItem('access_token');
        if (this.token) {
            this.userDataService.getFriendList(this.token).subscribe(
                (res) => {
                    this.isLoading = false;
                    this.friends = res;
                },
                (error) => {
                    this.isLoading = false;
                    this.error = error.message;
                }
            );
        }
    }

    onViewProfile(userId: string) {
        localStorage.setItem('onViewUserId', userId);
        this.router.navigate(['/view-profile']);
    }

    onRemoveFriend(userId: string) {
        let dialogRef = this.dialog.open(DialogBoxComponent);
        let removeUser = 'false';
        dialogRef.afterClosed().subscribe((res) => {
            removeUser = res;
            if (removeUser === 'true') {
                this.isRemoved.push(userId);
                if (this.token) {
                    this.userDataService
                        .unfriendUser(userId, this.token)
                        .subscribe(
                            (res) => {},
                            (error) => {
                                this.error = error.message;
                            }
                        );
                }
            }
            dialogRef.close();
        });
    }

    onBlock(userId: string) {
        let dialogRef = this.dialog.open(DialogBoxComponent);
        let blockUser = 'false';
        dialogRef.afterClosed().subscribe((res) => {
            blockUser = res;
            if (blockUser === 'true') {
                this.isBlocked.push(userId);
                if (this.token) {
                    this.userDataService
                        .blockUser(userId, this.token)
                        .subscribe(
                            (res) => {},
                            (error) => {
                                this.error = error.message;
                            }
                        );
                }
            }
            dialogRef.close();
        });
    }

    onTag(friendId: string) {
        this.isTagged.push(friendId);
    }

    onBackToCreatePost() {
        this.userDataService.saveTaggedFriends(this.isTagged);
        this.location.back();
    }
}
