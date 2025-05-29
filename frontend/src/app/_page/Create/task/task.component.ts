import { Component } from '@angular/core';
import { InputComponent } from '../../../_components/input/input.component';
import { GenInput } from '../../../_model/_common/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProjectsService } from '../../../_service/_model/projects.service';
import { NamePage } from '../../../_model/_common/name-page';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../../_service/_model/user.service';
import { UserRole } from '../../../_model/_enum/user-role';
import { Status } from '../../../_model/_enum/status';
import { Priority } from '../../../_model/_enum/priority';
import { AlertService } from '../../../_service/_alert/alert.service';
import { AlertEnum } from '../../../_model/_common/alert';
import { TasksService } from '../../../_service/_model/tasks.service';
import { Tasks } from '../../../_model/_interface/tasks';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NamePageComponent,
    MatCardModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    ProjectsService,
    UserService,
    TasksService,
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  form!: FormGroup;
  page: NamePage = {
    name: 'Create Task',
    icon: 'add',
  };

  configProject: GenInput = {
    label: 'Project Name',
    icon: 'assignment',
    type: 'select',
    placeholder: 'Select project name',
    formControlName: 'projectName',
    options: [],
    labelKey: 'name',
    valueKey: 'name',
  };
  configUser: GenInput = {
    label: 'User Name',
    icon: 'person',
    type: 'select',
    placeholder: 'Select user name',
    formControlName: 'userName',
    options: [],
    labelKey: 'name',
    valueKey: 'name',
  };
  configTitle: GenInput = {
    label: 'Title',
    icon: 'title',
    type: 'text',
    placeholder: 'Enter title',
    formControlName: 'title',
  };
  configDescription: GenInput = {
    label: 'Description',
    icon: 'description',
    type: 'text',
    placeholder: 'Enter description',
    formControlName: 'description',
  };
  configDueDate: GenInput = {
    label: 'Due Date',
    icon: 'date_range',
    type: 'date',
    placeholder: 'Select due date',
    formControlName: 'dueDate',
  };
  configStatus: GenInput = {
    label: 'Status',
    icon: 'check_circle',
    type: 'select',
    placeholder: 'Select status',
    formControlName: 'status',
    options: Object.entries(Status).map(([key, value]) => ({ key, value })),
    labelKey: 'value',
    valueKey: 'key',
  };
  configPriority: GenInput = {
    label: 'Priority',
    icon: 'priority_high',
    type: 'select',
    placeholder: 'Select priority',
    formControlName: 'priority',
    options: Object.entries(Priority).map(([key, value]) => ({ key, value })),
    labelKey: 'value',
    valueKey: 'key',
  };

  constructor(
    private _fb: FormBuilder,
    private _alertService: AlertService,
    private _projectService: ProjectsService,
    private _userService: UserService,
    private _taskService: TasksService,
    private _router: Router
  ) {
    this.form = this._fb.group({
      projectName: [null, Validators.required],
      userName: [null, Validators.required],
      title: [null, Validators.required],
      description: [null, Validators.required],
      dueDate: [null, Validators.required],
      status: [null, Validators.required],
      priority: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this._projectService.getAllProjects().subscribe({
      next: (response) => {
        this.configProject.options = [...response];
      },
      error: (error) => {
        console.log(error);
      },
    });
    this._userService.getAllUserDifferentOnRole(UserRole.ADMIN).subscribe({
      next: (response) => {
        this.configUser.options = [...response];
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onClick() {
    this.form.markAllAsTouched();
    if (
      this.form.get('projectName')?.hasError('required') &&
      this.form.get('projectName')?.touched
    ) {
      this._alertService.show('Project name is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('userName')?.hasError('required') &&
      this.form.get('userName')?.touched
    ) {
      this._alertService.show('User name is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('title')?.hasError('required') &&
      this.form.get('title')?.touched
    ) {
      this._alertService.show('Title is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('description')?.hasError('required') &&
      this.form.get('description')?.touched
    ) {
      this._alertService.show('Description is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('dueDate')?.hasError('required') &&
      this.form.get('dueDate')?.touched
    ) {
      this._alertService.show('Due date is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('status')?.hasError('required') &&
      this.form.get('status')?.touched
    ) {
      this._alertService.show('Status is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('priority')?.hasError('required') &&
      this.form.get('priority')?.touched
    ) {
      this._alertService.show('Priority is required.', AlertEnum.ERROR);
    }

    if (this.form.valid) {
      const task: Tasks = {
        id: '',
        projectId: this.form.value.projectName,
        assignedId: this.form.value.userName,
        title: this.form.value.title,
        description: this.form.value.description,
        dueDate: this.form.value.dueDate,
        status: this.form.value.status.key,
        priority: this.form.value.priority.key,
        createdAt: new Date(),
      };

      this._taskService.postNewTask(task).subscribe({
        next: (response) => {
          this._alertService.show(
            'The task is to add successfully.',
            AlertEnum.SUCCESS
          );
          this._router.navigateByUrl('/dashboard/feed');
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
