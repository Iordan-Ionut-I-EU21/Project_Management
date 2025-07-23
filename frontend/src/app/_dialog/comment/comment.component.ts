import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AlertService } from '../../_service/_alert/alert.service';
import { AlertEnum } from '../../_model/_common/alert';
import { JwtService } from '../../_service/_http/jwt.service';
import { User } from '../../_model/_interface/user';
import { response } from 'express';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [MatDialogContent, MatIconModule, CommonModule, ReactiveFormsModule],
  providers: [],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  // form!: FormGroup;
  // constructor(
  //   private _fb: FormBuilder,
  //   private _alertService: AlertService,
  //   private _tasksComment: TasksCommentsService,
  //   private _jwtService: JwtService,
  //   private dialogRef: MatDialogRef<CommentComponent>,
  //   @Inject(MAT_DIALOG_DATA)
  //   protected data: { id: string }
  // ) {
  //   this.form = this._fb.group({
  //     comment: [null, [Validators.required]],
  //   });
  // }
  // onSaveComment() {
  //   if (
  //     this.form.get('comment')?.touched &&
  //     this.form.get('comment')?.invalid
  //   ) {
  //     this._alertService.show('Need a comment to save.', AlertEnum.ERROR);
  //   }
  //   this.form.markAllAsTouched();
  //   if (this.form.valid) {
  //     const taskComment: TasksComments = {
  //       id: '',
  //       taskId: { id: this.data.id } as Tasks,
  //       userId: {} as User,
  //       commnet: this.form.get('comment')?.value,
  //       createdAt: new Date(),
  //     };
  //     this._tasksComment
  //       .postTaskComment(taskComment, this._jwtService.getEmail())
  //       .subscribe({
  //         next: (response) => {
  //           this._alertService.show(
  //             'Comment was save successfully.',
  //             AlertEnum.SUCCESS
  //           );
  //           this.closeDialog();
  //         },
  //         error: (error) => {
  //           console.log(error);
  //         },
  //       });
  //   }
  // }
  // private closeDialog() {
  //   this.dialogRef.close(true);
  // }
}
