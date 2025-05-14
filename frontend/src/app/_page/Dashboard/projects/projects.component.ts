import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ProjectsService } from '../../../_service/_model/projects.service';
import { HttpClientModule } from '@angular/common/http';
import { JwtService } from '../../../_service/_http/jwt.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Projects } from '../../../_model/_interface/projects';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { NamePage } from '../../../_model/_common/name-page';

interface Task {
  team: string;
  details: string;
}
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    NamePageComponent,
  ],
  providers: [ProjectsService],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Projects>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  page: NamePage = {
    name: 'Projects Overview',
    icon: 'folder_open',
  };
  constructor(
    private _projectsService: ProjectsService,
    private _jwtService: JwtService
  ) {
    this._projectsService
      .getDataOfProjectsByUserEmail(this._jwtService.getEmail())
      .subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource.data = response;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
