import { Component, Input } from '@angular/core';
import { NamePage } from '../../_model/_common/name-page';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-name-page',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './name-page.component.html',
  styleUrl: './name-page.component.scss',
})
export class NamePageComponent {
  @Input() page!: NamePage;

  constructor() {}
}
