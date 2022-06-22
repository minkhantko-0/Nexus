import { Component, OnInit } from '@angular/core';
import { GroupDataService } from '../group-data.service';
import { Group } from '../group.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../common/dialog-box/dialog-box.component';
import { Router } from '@angular/router';
import { Post } from '../../posts/posts.model';
import { PostsService } from '../../posts/posts.service';

@Component({
    selector: 'app-view-group',
    templateUrl: './view-group.component.html',
    styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit {
    isLoading = false;
    error = '';
    viewingGroup: Group | undefined;
    userId = '';
    private token: string | null | undefined;
    isRequested: string[] = [];
    isMember: string[] = [];
    groupPosts: Post[] = [];
    groupPostsLoading = false;
    isDeleted: string[] = [];

    constructor(
        private groupDataService: GroupDataService,
        public location: Location,
        private dialog: MatDialog,
        private router: Router,
        private postsService: PostsService
    ) {}

    ngOnInit(): void {
        this.isLoading = true;
        const groupId = localStorage.getItem('onViewGroupId');
        this.token = localStorage.getItem('access_token');
        const id = localStorage.getItem('userId');
        if (id) {
            this.userId = id;
        }
        if (groupId && this.token) {
            this.groupDataService.getGroupById(groupId, this.token).subscribe(
                (res) => {
                    this.viewingGroup = res;
                    this.isRequested = this.viewingGroup.requested_members.map(
                        (obj) => obj._id
                    );
                    this.isMember = this.viewingGroup.members.map(
                        (obj) => obj._id
                    );
                    this.isLoading = false;
                },
                (error) => {
                    this.error = error;
                    this.isLoading = false;
                }
            );
            if (
                this.viewingGroup?.admin._id === this.userId ||
                this.isMember.includes(this.userId)
            ) {
                this.groupPostsLoading = true;
                this.groupDataService
                    .getGroupPosts(groupId, this.token)
                    .subscribe(
                        (res) => {
                            this.groupPosts = res;
                            this.groupPostsLoading = false;
                        },
                        (error) => {
                            this.error = error.message;
                            this.groupPostsLoading = false;
                        }
                    );
            }
        }
    }

    onDeleteGroup(groupId: string | undefined) {
        let dialogRef = this.dialog.open(DialogBoxComponent);
        let deleteGroup = 'false';
        dialogRef.afterClosed().subscribe((res) => {
            deleteGroup = res;
            if (deleteGroup === 'true' && this.token && groupId) {
                this.isLoading = true;
                this.groupDataService
                    .deleteGroup(this.token, groupId)
                    .subscribe(
                        (res) => {
                            this.location.back();
                            this.isLoading = false;
                        },
                        (error) => {
                            this.isLoading = false;
                            this.error = error.message;
                        }
                    );
            }
            dialogRef.close();
        });
    }

    sendRequestToJoin(groupId: string | undefined) {
        if (groupId && this.token) {
            this.isRequested.push(this.userId);
            this.groupDataService.requestToJoin(groupId, this.token).subscribe(
                (res) => {},
                (error) => {
                    this.error = error.message;
                }
            );
        }
    }

    viewMembers() {
        localStorage.setItem('isViewingMembers', 'true');
        this.router.navigate(['/members-and-pending-requests']);
    }

    viewJoinRequests() {
        localStorage.setItem('isViewingMembers', 'false');
        this.router.navigate(['/members-and-pending-requests']);
    }

    onLeaveGroup(groupId: string | undefined) {
        if (this.token && groupId) {
            this.groupDataService
                .leaveGroup(groupId, this.token)
                .subscribe((res) => {
                    this.router.navigate(['/groups']);
                });
        }
    }

    addPost() {
        localStorage.setItem('isGroupPost', 'true');
        this.router.navigate(['/create-post']);
    }

    onDeletePost(postId: string) {
        this.isDeleted.push(postId);
        const token = localStorage.getItem('access_token');
        if (token) {
            this.postsService.deletePost(postId, token).subscribe(
                (res) => {},
                (error1) => {
                    this.error = error1.message;
                }
            );
        }
    }

    onComment(postId: string) {
        localStorage.setItem('onCommentPostId', postId);
        this.router.navigate(['/comments']);
    }

    onShare(postId: string) {
        localStorage.setItem('onSharePostId', postId);
        this.router.navigate(['/share-post']);
    }
}
