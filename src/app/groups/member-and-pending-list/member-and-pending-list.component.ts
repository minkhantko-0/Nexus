import { Component, OnInit } from '@angular/core';
import { GroupDataService } from '../group-data.service';
import { UserData } from '../../users/user-data.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-member-and-pending-list',
    templateUrl: './member-and-pending-list.component.html',
    styleUrls: ['./member-and-pending-list.component.scss'],
})
export class MemberAndPendingListComponent implements OnInit {
    private token: string | null | undefined;
    viewingMember: string | null | undefined;
    groupId = '';
    list: UserData[] | undefined;
    error = '';
    isLoading = false;
    isAccepted: string[] = [];
    isDeleted: string[] = [];

    constructor(
        private groupDataService: GroupDataService,
        public location: Location,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.token = localStorage.getItem('access_token');
        const groupId = localStorage.getItem('onViewGroupId');
        if (groupId) {
            this.groupId = groupId;
        }
        const viewingMember = localStorage.getItem('isViewingMembers');
        this.viewingMember = viewingMember;
        if (this.token && groupId) {
            this.isLoading = true;
            if (viewingMember === 'true') {
                this.groupDataService
                    .getMemberList(groupId, this.token)
                    .subscribe(
                        (res) => {
                            this.list = res;
                            this.isLoading = false;
                        },
                        (error) => {
                            this.error = error.message;
                            this.isLoading = false;
                        }
                    );
            } else if (viewingMember === 'false') {
                this.groupDataService
                    .getJoinRequests(groupId, this.token)
                    .subscribe(
                        (res) => {
                            this.list = res;
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

    viewProfile(userId: string) {
        localStorage.setItem('onViewUserId', userId);
        this.router.navigate(['/view-profile']);
    }

    acceptMemberRequest(userId: string) {
        this.isAccepted.push(userId);
        if (this.token) {
            this.groupDataService
                .acceptRequestToJoin(userId, this.groupId, this.token)
                .subscribe(
                    (res) => {},
                    (error) => {
                        this.error = error.message;
                    }
                );
        }
    }

    rejectMemberRequest(userId: string) {
        this.isDeleted.push(userId);
        if (this.token) {
            this.groupDataService
                .rejectRequestToJoin(userId, this.groupId, this.token)
                .subscribe(
                    (res) => {},
                    (error) => {
                        this.error = error.message;
                    }
                );
        }
    }

    kickMember(userId: string) {
        this.isDeleted.push(userId);
        if (this.token) {
            this.groupDataService
                .removeMemberFromGroup(userId, this.groupId, this.token)
                .subscribe(
                    (res) => {},
                    (error) => {
                        this.error = error.message();
                    }
                );
        }
    }
}
