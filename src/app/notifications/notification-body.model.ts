export class NotificationBody {
    public _id: string;
    public notification: string;
    public read: boolean;

    constructor(_id: string, notification: string, read: boolean) {
        this._id = _id;
        this.notification = notification;
        this.read = read;
    }
}
