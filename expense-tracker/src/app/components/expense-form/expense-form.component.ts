import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnChanges {
  @Input() editingExpense: any = null;
  @Output() expenseAdded = new EventEmitter<any>();

  expense = {
    title: '',
    amount: null,
    category: '',
    date: ''
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['editingExpense'] && this.editingExpense) {
      this.expense = { ...this.editingExpense };
    }
  }

  onSubmit() {
    this.expenseAdded.emit(this.expense);
    this.expense = { title: '', amount: null, category: '', date: '' };
  }
}
