import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContainer,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-validate-change',
  standalone: true,
  imports: [MatDialogContainer, MatDialogContent, MatIconModule],
  templateUrl: './validate-change.component.html',
  styleUrl: './validate-change.component.scss',
})
export class ValidateChangeComponent {
  message!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ValidateChangeComponent>
  ) {
    this.message = data.message;
  }

  onClose(result: boolean) {
    this.dialogRef.close(result);
  }
}
