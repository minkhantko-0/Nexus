import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { User } from '../users/users.model';
import { AuthService } from '../login/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-users',
    templateUrl: './new-users.component.html',
    styleUrls: ['./new-users.component.scss'],
})
export class NewUsersComponent implements OnInit {
    error = '';
    isLoading = false;
    image: any;
    imageUrl: string | undefined;
    accessToken = window.localStorage.getItem('access_token');

    user = new User('', '', '', '', '', '');
    constructor(private authService: AuthService, private router: Router) {}
    ngOnInit() {}

    onUpload(event: Event) {
        const { files } = event.target as HTMLInputElement;
        if (files && files.length) {
            const image = files.item(0);
            const reader = new FileReader();
            reader.onload = (data: any) => {
                const imageURl = data.target.result;
                this.image = image;
                this.imageUrl = imageURl;
            };
            if (image) {
                reader.readAsDataURL(image);
            }
        }
    }

    onCreate(form: NgForm) {
        this.user.username = form.controls['name'].value;
        if (this.imageUrl) this.user.imgSrc = this.imageUrl;
    }

    onInfoSubmit(form: NgForm) {
        this.user.hometown = form.controls['hometown'].value;
        this.user.birthday = form.controls['birthday'].value;
        this.user.bio = form.controls['bio'].value;
    }

    onSubmitStepper() {
        this.isLoading = true;
        if (this.accessToken) {
            this.authService
                .onCreateUserProfile(
                    this.image,
                    this.user.username,
                    this.user.birthday,
                    this.user.hometown,
                    this.user.bio,
                    this.accessToken
                )
                .subscribe(
                    (res) => {
                        this.isLoading = false;
                        this.router.navigate(['/home']);
                    },
                    (error) => {
                        this.error = error.error.message;
                        this.isLoading = false;
                        setTimeout(() => {
                            this.error = '';
                        }, 5000);
                    }
                );
        }
    }
}
