import { Component, OnInit } from '@angular/core';
import { UserData } from '../users/user-data.model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
    selector: 'app-newsfeed',
    templateUrl: './newsfeed.component.html',
    styleUrls: ['./newsfeed.component.scss'],
})
export class NewsfeedComponent implements OnInit {
    isLoading = false;
    error = '';
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
    token = localStorage.getItem('access_token');

    constructor(private http: HttpClient, private router: Router) {}

    ngOnInit(): void {
        if (this.token) {
            this.isLoading = true;
            this.http
                .get<UserData>(
                    'https://nexus-project-api.herokuapp.com/profile',
                    { headers: { authorization: this.token } }
                )
                .subscribe(
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

    onClickAvatar() {
        this.router.navigate(['/user']);
    }

    onCreatePost() {
        this.router.navigate(['/create-post']);
    }
}
