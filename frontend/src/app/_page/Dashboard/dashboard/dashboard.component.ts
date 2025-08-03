import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CardComponent } from '../../../_components/card/card.component';
import { CommonModule } from '@angular/common';
import { NamePage } from '../../../_components/name-page/name-page';
import { NamePageComponent } from '../../../_components/name-page/name-page.component';
import { JwtService } from '../../../_service/_http/jwt.service';
import { RolesLogicallyService } from '../../../_shared/roles-logically.service';
import { ICONS } from '../../../_shared/icons';
import { GenerateTableKeys } from '../../../_components/generate-table/generate-table-key';
import { GenerateTableComponent } from '../../../_components/generate-table/generate-table.component';
import { ProcessLogService } from '../../../_service/_model/process-log.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    CardComponent,
    CommonModule,
    NamePageComponent,
    GenerateTableComponent,
    MatCardModule,
  ],
  providers: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  type: boolean = true;

  page: NamePage = {
    name: 'Dashboard Overview',
    icon: ICONS.FEET,
  };

  keys: GenerateTableKeys[] = [GenerateTableKeys.PROCESS_LOG];

  constructor() {}

  onType(event: boolean) {
    this.type = event;
  }
}
