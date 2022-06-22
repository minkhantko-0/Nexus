import { Component, OnInit } from '@angular/core';
import { User } from '../users.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../login/auth.service';
import { UserData } from '../user-data.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-profiles',
    templateUrl: './user-profiles.component.html',
    styleUrls: ['./user-profiles.component.scss'],
})
export class UserProfilesComponent implements OnInit {
    isLoading = false;
    error = '';
    retrievedUser = new UserData(
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
    private token: string | null | undefined;

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.token = localStorage.getItem('access_token');
        this.isLoading = true;
        if (this.token) {
            this.authService.onGetCreatedUser(this.token).subscribe(
                (res) => {
                    this.retrievedUser = res;
                    this.authService.saveUserData(this.retrievedUser);
                    this.isLoading = false;
                },
                (error) => {
                    this.error = error.message;
                    this.isLoading = false;
                }
            );
        }
    }

    onEditProfile() {
        this.authService.saveUserData(this.retrievedUser);
        this.router.navigate(['/edit-profile']);
    }

    onLogOut() {
        localStorage.clear();
        this.router.navigate(['']);
    }

    viewFriends() {
        localStorage.setItem('isTaggingFriends', 'false');
        this.router.navigate(['/friend-list']);
    }

    viewBlockedUsers() {
        this.router.navigate(['/blocked-users']);
    }
}
