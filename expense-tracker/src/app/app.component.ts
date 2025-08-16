import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'expense-tracker';
  editingIndex: number | null = null;
  expenses: any[] = [];

  selectedCategory: string = '';
  selectedMonth: string = '';
  editingExpense: any = null;

  categories = ['Food', 'Transport', 'Shopping', 'Utilities'];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  ngOnInit() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
      this.expenses = JSON.parse(savedExpenses);
    }
  }

  filteredExpenses() {
    return this.expenses.filter(expense => {
      const expenseMonth = expense.date?.split('-')[1]; // format: yyyy-mm-dd

      return (!this.selectedCategory || expense.category === this.selectedCategory) &&
        (!this.selectedMonth || expenseMonth === this.selectedMonth);
    });
  }

  editExpense(index: number) {
    this.editingIndex = index;
    this.editingExpense = { ...this.expenses[index] }; // clone to avoid two-way binding issues
  }

  saveToLocalStorage() {
    localStorage.setItem('expenses', JSON.stringify(this.expenses));
  }


  addExpense(expense: any) {
    if (this.editingIndex !== null) {
      this.expenses[this.editingIndex] = expense;
      this.editingIndex = null;
    } else {
      this.expenses.push(expense);
    }
    this.saveToLocalStorage();
  }


  deleteExpense(index: number) {
    this.expenses.splice(index, 1);
    this.saveToLocalStorage(); // keep storage in sync
  }

}
