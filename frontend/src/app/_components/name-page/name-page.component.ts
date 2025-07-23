import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() type!: boolean;
  @Output() onType: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  onChangeVisibility() {
    this.type = !this.type;
    this.onType.emit(this.type);
  }
}
