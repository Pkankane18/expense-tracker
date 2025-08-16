import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {
  @Input() expenses: any[] = [];

  get totalAmount(): number {
    return this.expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  }

  get totalExpenses(): number {
    return this.expenses.length;
  }
}
