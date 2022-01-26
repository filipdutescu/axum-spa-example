import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { NotificationDialog } from '../notification/notification.dialog';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent {
    readonly usernameMinLength = 3;
    readonly usernameMaxLength = 15;
    readonly roomKeyMinLength = 5;
    readonly roomKeyMaxLength = 20;

    username = new FormControl(
        '',
        [
            Validators.required,
            Validators.minLength(this.usernameMinLength), Validators.maxLength(this.usernameMaxLength),
            Validators.pattern(/^[\w\d]+$/),
        ]);

    roomKey = new FormControl(
        '',
        [
            Validators.required,
            Validators.minLength(this.roomKeyMinLength), Validators.maxLength(this.roomKeyMaxLength),
            Validators.pattern(/^[\w\d-]+$/),
        ]);

    constructor(public dialog: MatDialog) {}

    getUsernameErrorMessage() {
        if (this.username.hasError('required')) {
            return 'You must enter a value';
        }

        if (this.username.hasError('minlength')) {
            return `Username must have be least ${this.usernameMinLength} characters`;
        }
        if (this.username.hasError('maxlength')) {
            return `Username must have less than ${this.usernameMaxLength} characters`;
        }

        return this.username.hasError('pattern') ? 'Not a valid username' : '';
    }

    getRoomKeyErrorMessage() {
        if (this.roomKey.hasError('required')) {
            return 'You must enter a value';
        }

        if (this.roomKey.hasError('minlength')) {
            return `Room key must have be least ${this.roomKeyMinLength} characters`;
        }
        if (this.roomKey.hasError('maxlength')) {
            return `Room key must have less than ${this.roomKeyMaxLength} characters`;
        }

        return this.roomKey.hasError('pattern') ? 'Not a valid room key' : '';
    }

    onSubmit() {
        const dialogRef = this.dialog.open(NotificationDialog, {
            width: '60%',
            minWidth: '250px',
            panelClass: 'dialog-bg-success',
            data: {
                title: 'Hello World!',
                content: 'I am working!',
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.username.reset()
            this.roomKey.reset();
        });
    }
}
