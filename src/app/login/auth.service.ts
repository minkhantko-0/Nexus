import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from '@angular/common/http';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { AuthUser } from './auth-user.model';
import { UserData } from '../users/user-data.model';
import { Router } from '@angular/router';

export interface AuthResData {
    user: {
        email: string;
        password: string;
        _id: string;
        friend_requests: [];
        friends: [];
        blocked_users: [];
    };
    token: string;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    passedOnData: UserData | undefined;
    currentlyViewingUser: UserData | undefined;
    user = new Subject<AuthUser>();

    constructor(private http: HttpClient, private router: Router) {}

    singUp(email: string, password: string) {
        return this.http
            .post<AuthResData>(
                'https://nexus-project-api.herokuapp.com/register',
                {
                    email: email,
                    password: password,
                }
            )
            .pipe(
                catchError((error) => {
                    return throwError(error.error.error);
                }),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.user.email,
                        resData.user.password,
                        resData.user._id,
                        resData.token
                    );
                })
            );
    }

    signIn(email: string, password: string) {
        return this.http
            .post<AuthResData>(
                'https://nexus-project-api.herokuapp.com/login',
                {
                    email: email,
                    password: password,
                }
            )
            .pipe(
                catchError((error) => {
                    return throwError(error.error.error);
                }),
                tap((resData) => {
                    this.handleAuthentication(
                        resData.user.email,
                        resData.user.password,
                        resData.user._id,
                        resData.token
                    );
                })
            );
    }

    handleAuthentication(
        email: string,
        password: string,
        _id: string,
        token: string
    ) {
        const user = new AuthUser(email, password, _id, token);
        this.user.next(user);
    }

    onCreateUserProfile(
        image: File,
        name: string,
        dateOfBirth: string,
        hometown: string,
        bio: string,
        token: string
    ) {
        const uploadData = new FormData();
        if (image) {
            uploadData.append('avatar', image);
        }
        uploadData.append('name', name);
        uploadData.append('dateOfBirth', dateOfBirth);
        uploadData.append('hometown', hometown);
        uploadData.append('bio', bio);

        return this.http.patch(
            'https://nexus-project-api.herokuapp.com/profile',
            uploadData,
            { headers: { authorization: 'Bearer ' + token } }
        );
    }

    onEditUserProfile(data: FormData, token: string) {
        return this.http.patch(
            'https://nexus-project-api.herokuapp.com/profile',
            data,
            { headers: { authorization: 'Bearer ' + token } }
        );
    }

    onGetCreatedUser(token: string) {
        return this.http.get<UserData>(
            'https://nexus-project-api.herokuapp.com/profile',
            {
                headers: { authorization: token },
            }
        );
    }

    saveUserData(data: UserData) {
        this.passedOnData = data;
    }

    viewOtherUser(id: string, token: string) {
        return this.http.get<UserData>(
            `https://nexus-project-api.herokuapp.com/users/${id}`,
            {
                headers: { authorization: token },
            }
        );
    }
}
