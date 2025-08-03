import { Component } from '@angular/core';
import { InputComponent } from '../../../_components/input/input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NamePage } from '../../../_components/name-page/name-page';
import { GenInput } from '../../../_components/input/input';
import { Status } from '../../../_model/_enum/status';
import { Categories } from '../../../_model/_interface/category';
import { CategoriesService } from '../../../_service/_model/categoies.service';
import { response } from 'express';
import { error } from 'console';
import { UserService } from '../../../_service/_model/user.service';
import { UserRole } from '../../../_model/_enum/user-role';
import { AlertService } from '../../../_service/_alert/alert.service';
import { Projects } from '../../../_model/_interface/projects';
import { TasksService } from '../../../_service/_model/tasks.service';
import { ProjectsService } from '../../../_service/_model/projects.service';
import { Router } from '@angular/router';
import { AlertEnum } from '../../../_model/_common/alert';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NamePageComponent,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    CategoriesService,
    UserService,
    ProjectsService,
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  form!: FormGroup;
  page: NamePage = {
    name: 'Create Project',
    icon: 'add',
  };

  configName: GenInput = {
    label: 'Name',
    icon: 'work',
    type: 'text',
    placeholder: 'Enter Name',
    formControlName: 'name',
  };
  configDescription: GenInput = {
    label: 'Description',
    icon: 'description',
    type: 'text',
    placeholder: 'Enter description',
    formControlName: 'description',
  };
  configCategory: GenInput = {
    label: 'Categories',
    icon: 'check_circle',
    type: 'select',
    placeholder: 'Select categories',
    formControlName: 'categories',
    options: [],
    labelKey: 'name',
    valueKey: 'name',
  };
  configEndDate: GenInput = {
    label: 'End Date',
    icon: 'date_range',
    type: 'date',
    placeholder: 'Select end date',
    formControlName: 'endDate',
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
  constructor(
    private _fb: FormBuilder,
    private _categoriesService: CategoriesService,
    private _userService: UserService,
    private _alertService: AlertService,
    private _projectsService: ProjectsService,
    private _router: Router
  ) {
    this.form = this._fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      categories: [null, Validators.required],
      endDate: [null, Validators.required],
      status: [null, Validators.required],
      userName: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this._categoriesService.getAllCategories().subscribe({
      next: (response) => {
        this.configCategory.options = [...response];
      },
      error: (error) => {
        console.log(error);
      },
    });
    this._userService
      .getAllUserDifferentOnRole(UserRole.TEAM_MEMBER)
      .subscribe({
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
      this.form.get('name')?.hasError('required') &&
      this.form.get('name')?.touched
    ) {
      this._alertService.show('Name is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('description')?.hasError('required') &&
      this.form.get('description')?.touched
    ) {
      this._alertService.show('Description is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('categories')?.hasError('required') &&
      this.form.get('categories')?.touched
    ) {
      this._alertService.show('Categories is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('endDate')?.hasError('required') &&
      this.form.get('endDate')?.touched
    ) {
      this._alertService.show('End date is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('status')?.hasError('required') &&
      this.form.get('status')?.touched
    ) {
      this._alertService.show('Status is required.', AlertEnum.ERROR);
    }
    if (
      this.form.get('userName')?.hasError('required') &&
      this.form.get('userName')?.touched
    ) {
      this._alertService.show('User is required.', AlertEnum.ERROR);
    }

    if (this.form.valid) {
      const project: Projects = {
        id: '',
        name: this.form.value.name,
        categoryId: this.form.value.categories,
        startDate: new Date(),
        endDate: this.form.value.endDate,
        status: this.form.value.status.key,
        managerId: this.form.value.userName,
        description: this.form.value.description,
      };
      this._projectsService.postNewProjects(project).subscribe({
        next: (response) => {
          this._alertService.show(
            'The project is to add successfully.',
            AlertEnum.SUCCESS
          );
          this._router.navigateByUrl('/dashboard/feed');
        },
      });
    }
  }
}
