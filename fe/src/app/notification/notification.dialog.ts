import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface NotificationData {
    title: string;
    content: string;
}

@Component({
  selector: 'dialog-notification',
  templateUrl: './notification.dialog.html',
})
export class NotificationDialog  {
    constructor(
        public dialogRef: MatDialogRef<NotificationDialog>,
        @Inject(MAT_DIALOG_DATA) public data: NotificationData,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
