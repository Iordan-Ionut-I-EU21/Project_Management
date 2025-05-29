import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GenInput } from '../../_model/_common/input';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-input',
  standalone: true,
  imports: [MatIconModule, ReactiveFormsModule, CommonModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() config!: GenInput;
  @Input() formGroup!: FormGroup;
  @Output() selectChange = new EventEmitter<any>();
  constructor() {}

  onSelectChange(event: any) {
    const selectEl = event.target as HTMLSelectElement;
    const selectedIndex = selectEl.selectedIndex;
    const selectedOption = this.config.options?.[selectedIndex];

    this.selectChange.emit(selectedOption);
  }
}
