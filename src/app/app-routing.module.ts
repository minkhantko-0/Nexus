import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './home/home.component'
import { UserProfilesComponent } from './users/user-profiles/user-profiles.component'
import { NewUsersComponent } from './new-users/new-users.component'
import { LoginComponent } from './login/login.component'
import { UserProfileEditComponent } from './users/user-profile-edit/user-profile-edit.component'
import { CreatePostComponent } from './posts/create-post/create-post.component'
import { AddFriendComponent } from './users/add-friend/add-friend.component'
import { ViewProfileComponent } from './users/view-profile/view-profile.component'
import { FriendRequestsComponent } from './users/friend-requests/friend-requests.component'
import { InteractionsComponent } from './users/interactions/interactions.component'
import { CommentsComponent } from './posts/comments/comments.component'
import { FriendListComponent } from './users/user-profiles/friend-list/friend-list.component'
import { BlockedUserListComponent } from './users/user-profiles/blocked-user-list/blocked-user-list.component'
import { SharePostComponent } from './posts/share-post/share-post.component'
import { SearchComponent } from './search-bar/search/search.component'
import { GroupsComponent } from './groups/groups.component'
import { GroupCreateComponent } from './groups/group-create/group-create.component'
import { ViewGroupComponent } from './groups/view-group/view-group.component'
import { MemberAndPendingListComponent } from './groups/member-and-pending-list/member-and-pending-list.component'
import { NotificationsComponent } from './notifications/notifications.component'

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserProfilesComponent },
  { path: 'interactions', component: InteractionsComponent },
  { path: 'create-post', component: CreatePostComponent },
  { path: 'new-user', component: NewUsersComponent },
  { path: 'edit-profile', component: UserProfileEditComponent },
  { path: 'view-profile', component: ViewProfileComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'people-you-may-know', component: AddFriendComponent },
  { path: 'friend-requests', component: FriendRequestsComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'friend-list', component: FriendListComponent },
  { path: 'blocked-users', component: BlockedUserListComponent },
  { path: 'share-post', component: SharePostComponent },
  { path: 'search', component: SearchComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'create-group', component: GroupCreateComponent },
  { path: 'view-group', component: ViewGroupComponent },
  {
    path: 'members-and-pending-requests',
    component: MemberAndPendingListComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
