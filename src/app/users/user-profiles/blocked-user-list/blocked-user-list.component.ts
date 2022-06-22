import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../user-data.service';
import { UserData } from '../../user-data.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../common/dialog-box/dialog-box.component';

@Component({
    selector: 'app-blocked-user-list',
    templateUrl: './blocked-user-list.component.html',
    styleUrls: ['./blocked-user-list.component.scss'],
})
export class BlockedUserListComponent implements OnInit {
    private token: string | null | undefined;
    blockedUsers: UserData[] | undefined;
    error = '';
    isLoading = false;
    isRemoved: string[] = [];

    constructor(
        private userDataService: UserDataService,
        public location: Location,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.token = localStorage.getItem('access_token');
        if (this.token) {
            this.isLoading = true;
            this.userDataService.getBlockedUsers(this.token).subscribe(
                (res) => {
                    this.isLoading = false;
                    this.blockedUsers = res;
                },
                (error) => {
                    this.isLoading = false;
                    this.error = error.message;
                }
            );
        }
    }

    onUnblock(userId: string) {
        let dialogRef = this.dialog.open(DialogBoxComponent);
        let unblockUser = 'false';
        dialogRef.afterClosed().subscribe((res) => {
            unblockUser = res;
            if (unblockUser === 'true') {
                this.isRemoved.push(userId);
                if (this.token) {
                    this.userDataService
                        .unBlockUser(userId, this.token)
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
}
