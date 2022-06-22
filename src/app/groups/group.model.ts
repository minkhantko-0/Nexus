import { UserData } from '../users/user-data.model';
import { UserRequest } from '../users/user-request.model'

export class Group {
    public name: string;
    public profile: string;
    public description: string;
    public admin: UserData;
    public _id: string;
    public members: UserRequest[];
    public requested_members: UserRequest[];
    public createdAt: string;
    public updatedAt: string;

    constructor(
        name: string,
        profile: string,
        description: string,
        admin: UserData,
        _id: string,
        members: UserRequest[],
        requested_members: UserRequest[],
        createdAt: string,
        updatedAt: string
    ) {
        this.name = name;
        this.profile = profile;
        this.description = description;
        this.admin = admin;
        this._id = _id;
        this.members = members;
        this.requested_members = requested_members;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
