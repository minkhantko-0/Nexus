import { Component, OnInit } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    userSub: Subscription | undefined;
    constructor(private authService: AuthService) {}
    token: string | null | undefined;
    ngOnInit(): void {}

}
