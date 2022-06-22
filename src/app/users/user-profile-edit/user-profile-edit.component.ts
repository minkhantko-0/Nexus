import { Component, OnInit } from '@angular/core';
import { UserData } from '../user-data.model';
import { AuthService } from '../../login/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-profile-edit',
    templateUrl: './user-profile-edit.component.html',
    styleUrls: ['./user-profile-edit.component.scss'],
})
export class UserProfileEditComponent implements OnInit {
    currentlyEditingData: UserData | undefined;
    isProfilePhotoChanged = false;
    image: any;
    imageUrl: string | undefined;
    isLoading = false;
    error = '';
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.currentlyEditingData = this.authService.passedOnData;
        this.image = this.currentlyEditingData?.avatar;
        this.imageUrl = this.currentlyEditingData?.avatar.url;
    }
    onUpload(event: Event) {
        const { files } = event.target as HTMLInputElement;
        if (files && files.length) {
            this.isProfilePhotoChanged = true;
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

    onSave(form: NgForm) {
        const editedData = new FormData();
        editedData.append(
            this.isProfilePhotoChanged ? 'avatar' : 'avatarUrl',
            this.image
        );
        editedData.append('name', form.value['name']);
        editedData.append('dateOfBirth', form.value['dateOfBirth']);
        editedData.append('bio', form.value['bio']);
        editedData.append('hometown', form.value['hometown']);
        const token = window.localStorage.getItem('access_token');
        if (token) {
            this.isLoading = true;
            this.authService.onEditUserProfile(editedData, token).subscribe(
                (res) => {
                    this.isLoading = false;
                    this.router.navigate(['user']);
                },
                (error) => {
                    this.isLoading = false;
                    this.error = error.message;
                    setTimeout(() => {
                        this.router.navigate(['user']);
                    }, 5000);
                }
            );
        }
    }
    onCancel() {
        this.router.navigate(['user']);
    }
}
