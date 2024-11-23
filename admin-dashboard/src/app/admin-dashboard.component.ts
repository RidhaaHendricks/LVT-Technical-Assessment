import { IAdminDashboard } from './models/admin.dashboard.model';
import { DataService } from './express-server/data.server';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sorting } from './models/sorting.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: [
    './admin-dashboard.component.css',
    '../styles.css'
  ]
})

export class AdminDashboardComponent implements OnInit {
  title: string = ""
  tempNumbers: IAdminDashboard[] = [];
  data: any;
  displayedColumns: string[] = ['#', 'Phone Number', 'Status', 'Messages'];
  sorting: Sorting = {
    column: 'Status',
    order: 'asc'
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.dataService.getData().subscribe(response => {
      this.data = response.message;
    });
  }

  sortByStatus(data: any) {
    if (this.sorting.order === 'asc') data.sort((a: any, b: any) => {
      if (a.status < b.status) {
        return -1;
      }

      if (a.status > b.status) {
        return 1;
      }

      return 0;
    });
    else
      data.sort((a: any, b: any) => {
        if (a.status < b.status) {
          return 1;
        }

        if (a.status > b.status) {
          return -1;
        }

        return 0;
      });
  }

  isDesc(column: string): boolean {
    let desc = this.sorting.column === column && this.sorting.order === 'desc';

    return desc;
  }

  sortClick(column: string) {
    if (column !== 'Status')
      return;

    const newSorting = this.isDesc(column) ? 'asc' : 'desc';

    this.sorting = {
      column: column,
      order: newSorting
    }

    this.sortByStatus(this.data)
  }

}
