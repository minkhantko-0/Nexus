import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupDataService } from './group-data.service';
import { Group } from './group.model';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
    yourGroups: Group[] | undefined;
    joinedGroups: Group[] | undefined;
    isLoading = false;
    error = '';

    constructor(
        private router: Router,
        private groupDataService: GroupDataService
    ) {}

    ngOnInit(): void {
        const token = localStorage.getItem('access_token');
        if (token) {
            this.getYourGroups(token);
            this.getJoinedGroups(token);
        }
    }

    onCreateGroup() {
        this.router.navigate(['/create-group']);
    }

    getYourGroups(token: string) {
        this.isLoading = true;
        this.groupDataService.getCreatedGroups(token).subscribe(
            (res) => {
                this.yourGroups = res;
                this.isLoading = false;
            },
            (error) => {
                this.error = error.message;
                this.isLoading = false;
            }
        );
    }

    getJoinedGroups(token: string) {
        this.isLoading = true;
        this.groupDataService.getJoinedGroups(token).subscribe(
            (res) => {
                this.joinedGroups = res;
                this.isLoading = false;
            },
            (error) => {
                this.error = error.message;
                this.isLoading = false;
            }
        );
    }

    onViewGroup(groupId: string) {
        localStorage.setItem('onViewGroupId', groupId);
        this.router.navigate(['/view-group']);
    }
}
