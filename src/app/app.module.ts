import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { UserProfilesComponent } from './users/user-profiles/user-profiles.component';
import { HeaderComponent } from './header/header.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NewUsersComponent } from './new-users/new-users.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
import { UserProfileEditComponent } from './users/user-profile-edit/user-profile-edit.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { AddFriendComponent } from './users/add-friend/add-friend.component';
import { ValueArrayPipe } from './users/add-friend/value-array.pipe';
import { ViewProfileComponent } from './users/view-profile/view-profile.component';
import { DialogBoxComponent } from './common/dialog-box/dialog-box.component';
import { UserPostsComponent } from './posts/user-posts/user-posts.component';
import { FriendRequestsComponent } from './users/friend-requests/friend-requests.component';
import { InteractionsComponent } from './users/interactions/interactions.component';
import { ViewPostsComponent } from './posts/view-posts/view-posts.component';
import { NewsfeedPostsComponent } from './posts/newsfeed-posts/newsfeed-posts.component';
import { CommentsComponent } from './posts/comments/comments.component';
import { FriendListComponent } from './users/user-profiles/friend-list/friend-list.component';
import { BlockedUserListComponent } from './users/user-profiles/blocked-user-list/blocked-user-list.component';
import { SharePostComponent } from './posts/share-post/share-post.component';
import { SearchComponent } from './search-bar/search/search.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupCreateComponent } from './groups/group-create/group-create.component';
import { ViewGroupComponent } from './groups/view-group/view-group.component';
import { MemberAndPendingListComponent } from './groups/member-and-pending-list/member-and-pending-list.component';
import { VerticalLoaderComponent } from './common/vertical-loader/vertical-loader.component';
import { NotificationsComponent } from './notifications/notifications.component';

@NgModule({
    declarations: [
        AppComponent,
        UserProfilesComponent,
        HeaderComponent,
        LoginComponent,
        NewUsersComponent,
        HomeComponent,
        LoadingSpinnerComponent,
        UserProfileEditComponent,
        NewsfeedComponent,
        CreatePostComponent,
        AddFriendComponent,
        ValueArrayPipe,
        ViewProfileComponent,
        DialogBoxComponent,
        UserPostsComponent,
        FriendRequestsComponent,
        InteractionsComponent,
        ViewPostsComponent,
        NewsfeedPostsComponent,
        CommentsComponent,
        FriendListComponent,
        BlockedUserListComponent,
        SharePostComponent,
        SearchComponent,
        GroupsComponent,
        GroupCreateComponent,
        ViewGroupComponent,
        MemberAndPendingListComponent,
        VerticalLoaderComponent,
        NotificationsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
