import { NotificationBody } from './notification-body.model';

export class Notification {
    public notifications: NotificationBody[];
    public count: number;
    public readed_noti: number;
    public unreaded_noti: number;

    constructor(
        notifications: NotificationBody[],
        count: number,
        readed_noti: number,
        unreaded_noti: number
    ) {
        this.notifications = notifications;
        this.count = count;
        this.readed_noti = readed_noti;
        this.unreaded_noti = unreaded_noti;
    }
}
