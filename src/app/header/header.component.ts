import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notifications/notification.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    unreadNoti: number | undefined;

    constructor(private notificationService: NotificationService) {}

    ngOnInit(): void {
        const token = localStorage.getItem('access_token');
        if (token) {
            this.notificationService.getAllNotifications(token).subscribe(
                (res) => {
                    this.unreadNoti = res.unreaded_noti;
                },
                (error) => {}
            );
        }
    }
}
