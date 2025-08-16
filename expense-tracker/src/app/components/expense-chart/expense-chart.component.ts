import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-expense-chart',
  templateUrl: './expense-chart.component.html',
  styleUrls: ['./expense-chart.component.scss']
})
export class ExpenseChartComponent implements OnChanges {
  @Input() expenses: any[] = [];

  chartData: ChartConfiguration<'pie'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#42a5f5', '#66bb6a', '#ffca28', '#ef5350']
    }]
  };

  chartType: ChartType = 'pie';

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['expenses']) {
      this.updateChart();
    }
  }


  updateChart() {
    const categoryTotals: { [key: string]: number } = {};

    this.expenses.forEach(exp => {
      if (!categoryTotals[exp.category]) {
        categoryTotals[exp.category] = 0;
      }
      categoryTotals[exp.category] += Number(exp.amount);
    });

    // Reassign to trigger change detection
    this.chartData = {
      labels: Object.keys(categoryTotals),
      datasets: [{
        data: Object.values(categoryTotals),
        backgroundColor: ['#42a5f5', '#66bb6a', '#ffca28', '#ef5350']
      }]
    };
  }

}
