import { Component, ViewChild } from '@angular/core';
import { NamePage } from '../../../_components/name-page/name-page';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ProjectsService } from '../../../_service/_model/projects.service';
import { UserService } from '../../../_service/_model/user.service';
import { TasksService } from '../../../_service/_model/tasks.service';
import { InputComponent } from '../../../_components/input/input.component';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { MatCardModule } from '@angular/material/card';
import { GenInput } from '../../../_components/input/input';
import { Role } from '../../../_model/_enum/role';
import { AlertService } from '../../../_service/_alert/alert.service';
import { AlertEnum } from '../../../_model/_common/alert';
import { ProjectMembers } from '../../../_model/_interface/project-members';
import { ProjectsMembersService } from '../../../_service/_model/projects-members.service';
import { response } from 'express';
import { error } from 'console';
import { UserRole } from '../../../_model/_enum/user-role';
import { eventNames } from 'process';
import { SortPage } from '../../../_model/_common/sort-page';
import { ChangePage } from '../../../_model/_common/change-page';
import { Environment } from '../../../../environments/environment';
import { TableColumn } from '../../../_model/_common/table-column';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Projects } from '../../../_model/_interface/projects';
import { TableComponent } from '../../../_components/generate-table/table/table.component';
import { User } from '../../../_model/_interface/user';
import { HttpClientModule } from '@angular/common/http';
import { ExcelExportService } from '../../../_service/_excel/excel.service';

@Component({
  selector: 'app-project-member',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    NamePageComponent,
    MatCardModule,
    TableComponent,
    HttpClientModule,
  ],
  providers: [
    provideNativeDateAdapter(),
    ProjectsService,
    ProjectsMembersService,
    UserService,
  ],
  templateUrl: './project-member.component.html',
  styleUrl: './project-member.component.scss',
})
export class ProjectMemberComponent {
  form!: FormGroup;
  page: NamePage = {
    name: 'Add Project Members',
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

  configRole: GenInput = {
    label: 'Role',
    icon: 'assignment_ind',
    type: 'select',
    placeholder: 'Select role',
    formControlName: 'role',
    options: Object.entries(Role).map(([key, value]) => ({ key, value })),
    labelKey: 'value',
    valueKey: 'key',
  };

  columns: TableColumn[] = [
    { key: 'userId.name', code: 'pm.userId.name', label: 'Name', type: 'text' },
    {
      key: 'userId.email',
      code: 'pm.userId.email',
      label: 'Email',
      type: 'text',
    },
    {
      key: 'role',
      code: 'pm.userId.role',
      label: 'Role',
      type: 'text',
    },
    {
      key: 'startDate',
      code: 'pm.startDate',
      label: 'Created Date',
      pipe: 'date',
      isActive: false,
    },
  ];
  sortPage: SortPage = {
    column: this.columns[0].key,
    direction: '',
  };
  changePage: ChangePage = {
    pageIndex: 0,
    pageSize: Environment.pageSize,
  };
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  data!: User[];
  count!: number;
  saveLocalProject!: Projects;
  constructor(
    private _fb: FormBuilder,
    private _projectService: ProjectsService,
    private _alertService: AlertService,
    private _projectMemberService: ProjectsMembersService,
    private _userService: UserService,
    private _excelService: ExcelExportService
  ) {
    this.form = this._fb.group({
      projectName: [null, Validators.required],
      userName: [null, Validators.required],
      role: [null, Validators.required],
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

  selectChange(event: any) {
    this.saveLocalProject = event;
    this.fetchData();
  }

  onSortChanged(sort: any) {
    this.sortPage = sort;
    this.fetchData();
  }

  onPageChanged(page: any) {
    this.changePage = page;
    this.fetchData();
  }

  fetchData() {
    this._projectMemberService
      .postDataUsersByProjectId(
        this.saveLocalProject.id,
        this.sortPage,
        this.changePage
      )
      .subscribe({
        next: (response) => {
          this.data = response.items;
          this.count = response.count;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onExport() {
    this._projectMemberService
      .getExcelUsersByProjectId(
        this.columns
          .filter((c) => c.type !== 'button')
          .map((c) => c.code)
          .join(', '),
        this.saveLocalProject.id
      )
      .subscribe({
        next: (response) => {
          // console.log(response);
          this._excelService.exportToExcel(
            this.columns.filter((c) => c.type !== 'button').map((c) => c.label),
            response,
            'Project Members'
          );
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
      this.form.get('role')?.hasError('required') &&
      this.form.get('role')?.touched
    ) {
      this._alertService.show('Role is required.', AlertEnum.ERROR);
    }
    if (this.form.valid) {
      console.log(this.form.value);
      const projectMember: ProjectMembers = {
        id: '',
        projectId: this.form.value.projectName,
        userId: this.form.value.userName,
        role: this.form.value.role.key,
        startDate: new Date(),
      };

      this._projectMemberService
        .postNewProjectMembers(projectMember)
        .subscribe({
          next: (response) => {
            // console.log(response);
            this.form.get('userName')?.setValue(null);
            this.form.get('role')?.setValue(null);
            this.fetchData();
          },
          error: (error) => {
            console.log(error);
          },
        });
    }
  }
}
