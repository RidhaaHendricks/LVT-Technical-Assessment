import { IAdminDashboard } from './models/admin.dashboard.model';
import { DataService } from './express-server/data.server';
import { CommonModule } from '@angular/common';
import {AfterViewInit, ViewChild, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})

export class AdminDashboardComponent implements OnInit {
  title: string = ""
  tempNumbers: IAdminDashboard[] = [];
  data: any;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData().subscribe(response => {
      this.data = response.message;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }
}
