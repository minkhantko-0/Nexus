import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupDataService } from '../group-data.service';
import { Location } from '@angular/common';
import { Group } from '../group.model';

@Component({
    selector: 'app-group-create',
    templateUrl: './group-create.component.html',
    styleUrls: ['./group-create.component.scss'],
})
export class GroupCreateComponent implements OnInit {
    image: any;
    imageUrl: string | undefined;
    error = '';
    isLoading = false;

    constructor(
        private groupDataService: GroupDataService,
        public location: Location
    ) {}

    ngOnInit(): void {}

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

    onCreateGroup(form: NgForm) {
        this.isLoading = true;
        const token = localStorage.getItem('access_token');
        const groupData = new FormData();
        groupData.append('name', form.value.name);
        groupData.append('profile', this.image);
        groupData.append('description', form.value.description);
        if (token) {
            this.groupDataService.createGroup(groupData, token).subscribe(
                (res) => {
                    this.isLoading = false;
                    this.location.back();
                },
                (error) => {
                    this.isLoading = false;
                    this.error = error.message;
                }
            );
        }
    }
}
