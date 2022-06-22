import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResData, AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    isSignUp = true;
    isLoading = false;
    errorMess: string | undefined;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {}

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.isLoading = true;

        if (this.isSignUp) {
            this.authService.singUp(email, password).subscribe(
                (res) => {
                    localStorage.setItem('userId', res.user._id);
                    localStorage.setItem('access_token', res.token);
                    this.isLoading = false;
                    this.router.navigate(['/new-user']);
                },
                (error) => {
                    console.log(error);
                    this.errorMess = error;
                    this.isLoading = false;
                    setTimeout(() => {
                        this.errorMess = '';
                    }, 5000);
                }
            );
        } else {
            this.authService.signIn(email, password).subscribe(
                (res) => {
                    localStorage.setItem('userId', res.user._id);
                    localStorage.setItem('access_token', res.token);
                    this.isLoading = false;
                    this.router.navigate(['/home']);
                },
                (error) => {
                    console.log(error);
                    this.errorMess = error;
                    this.isLoading = false;
                    setTimeout(() => {
                        this.errorMess = '';
                    }, 5000);
                }
            );
        }
    }
}
