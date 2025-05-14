import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { Card } from '../../_model/_common/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() card!: Card;
  @Output() cardClicked = new EventEmitter<any>();

  constructor() {}

  onCardClick() {
    this.cardClicked.emit(this.card);
  }
}
