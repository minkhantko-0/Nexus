import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserData } from '../users/user-data.model';
import { Group } from '../groups/group.model';

@Injectable({
    providedIn: 'root',
})
export class SearchDataService {
    constructor(private http: HttpClient) {}

    searchUsers(searchInput: string, token: string) {
        return this.http.get<UserData[]>(
            `https://nexus-project-api.herokuapp.com/search_by_name/${searchInput}`,
            { headers: { authorization: token } }
        );
    }

    searchGroups(searchInput: string, token: string) {
        return this.http.get<Group[]>(
            `https://nexus-project-api.herokuapp.com/search_groups/${searchInput}`,
            {
                headers: { authorization: token },
            }
        );
    }
}
