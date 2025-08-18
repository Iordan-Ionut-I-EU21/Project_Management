import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NamePage } from './name-page';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-name-page',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './name-page.component.html',
  styleUrl: './name-page.component.scss',
})
export class NamePageComponent {
  @Input() page!: NamePage;
  @Input() type!: boolean;
  @Input() isHidden!: boolean;
  @Output() onType: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() {}

  onChangeVisibility() {
    this.type = !this.type;
    this.onType.emit(this.type);
  }
}
