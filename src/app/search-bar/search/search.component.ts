import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SearchDataService } from '../search-data.service';
import { NgForm } from '@angular/forms';
import { UserData } from '../../users/user-data.model';
import { Router } from '@angular/router';
import { Group } from '../../groups/group.model';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    private token: string | null | undefined;
    results: UserData[] | undefined;
    groupResults: Group[] | undefined;
    isSearchingGroups = false;
    error = '';
    isLoading = false;
    isSearching = false; //to disable search button

    constructor(
        private searchDataService: SearchDataService,
        private router: Router
    ) {}

    ngOnInit() {}

    onSearch(f: NgForm) {
        this.isSearching = true;
        const { isUser, searchInput } = f.value;
        this.token = localStorage.getItem('access_token');
        if (this.token) {
            this.isLoading = true;
            if (isUser) {
                this.isSearchingGroups = false;
                this.searchDataService
                    .searchUsers(searchInput, this.token)
                    ?.subscribe(
                        (res) => {
                            this.results = res;
                            this.isLoading = false;
                            this.isSearching = false;
                        },
                        (error) => {
                            this.error = error.message;
                            this.isLoading = false;
                            this.isSearching = false;
                        }
                    );
            }
            if (!isUser) {
                this.isSearchingGroups = true;
                this.searchDataService
                    .searchGroups(searchInput, this.token)
                    .subscribe(
                        (res) => {
                            this.groupResults = res;
                            this.isLoading = false;
                            this.isSearching = false;
                        },
                        (error) => {
                            this.error = error.message();
                            this.isLoading = false;
                            this.isSearching = false;
                        }
                    );
            }
        }
    }

    onView(onViewUserId: string) {
        localStorage.setItem('onViewUserId', onViewUserId);
        const loggedUserId = localStorage.getItem('userId');
        if (loggedUserId !== onViewUserId) {
            this.router.navigate(['/view-profile']);
        } else this.router.navigate(['/user']);
    }

    onViewGroup(onViewGroupId: string) {
        localStorage.setItem('onViewGroupId', onViewGroupId);
        this.router.navigate(['/view-group']);
    }
}
