import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isNearEndDate',
  standalone: true,
})
export class IsNearEndDatePipe implements PipeTransform {
  transform(endDate: Date | string): string {
    if (!endDate) return '';
    const now = new Date();
    const d = new Date(endDate);

    if (d.getTime() < now.getTime()) {
      return 'red-text';
    }

    const diffMs = d.getTime() - now.getTime();
    const diffDays = diffMs / (1000 * 60 * 60 * 24);

    if (diffDays < 0) {
      return 'red-text';
    } else if (diffDays <= 30) {
      return 'red-text';
    } else if (diffDays <= 60) {
      return 'orange-text';
    } else {
      return 'green-text';
    }
  }
}
