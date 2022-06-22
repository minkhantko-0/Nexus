import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from './notifications.model';

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    unreadCounts: number | undefined;

    constructor(private http: HttpClient) {}

    getAllNotifications(token: string) {
        return this.http.get<Notification>(
            'https://nexus-project-api.herokuapp.com/notifications',
            { headers: { authorization: token } }
        );
    }

    readANotification(noti_id: string, token: string) {
        return this.http.post(
            'https://nexus-project-api.herokuapp.com/read_noti',
            { noti_id },
            { headers: { authorization: token } }
        );
    }
}
