import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import { Notification } from './notifications.model';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit {
    private token = '';
    error = '';
    isLoading = false;
    readNoti: string[] = [];

    notifications: Notification | undefined;

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
        const token = localStorage.getItem('access_token');
        if (token) {
            this.token = token;
        }
        this.isLoading = true;
        this.notificationService.getAllNotifications(this.token).subscribe(
            (res) => {
                this.notifications = res;
                this.isLoading = false;
            },
            (error) => {
                this.error = error.message;
                this.isLoading = false;
            }
        );
    }

    read(notiId: string) {
        this.readNoti.push(notiId);
        this.notificationService
            .readANotification(notiId, this.token)
            .subscribe(
                (res) => {
                    this.ngOnInit();
                },
                (error1) => {
                    this.error = error1.message;
                }
            );
    }
}
