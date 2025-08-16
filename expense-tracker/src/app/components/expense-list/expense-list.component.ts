import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.scss']
})
export class ExpenseListComponent {
  @Input() expenses: any[] = [];
  @Output() deleteExpense = new EventEmitter<number>();
  @Output() editExpense = new EventEmitter<number>();

  displayedColumns: string[] = ['title', 'amount', 'category', 'date', 'actions'];

onEdit(index: number) {
  this.editExpense.emit(index);
}


  onDelete(index: number) {
    this.deleteExpense.emit(index);
  }
}
