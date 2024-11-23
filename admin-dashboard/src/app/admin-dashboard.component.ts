import { IAdminDashboard } from './models/admin.dashboard.model';
import { DataService } from './express-server/data.server';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Sorting } from './models/sorting.model';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MessageSender } from './models/message-sender.model';
import { sentence } from '@ndaidong/txtgen';
import { uniqueNamesGenerator, Config, adjectives, colors, animals } from 'unique-names-generator';

const customConfig: Config = {
  dictionaries: [animals],
  separator: '-',
  length: 1,
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NgbModule,
    MatSlideToggleModule,
    NgbPopoverModule,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: [
    './admin-dashboard.component.css',
    '../styles.css'
  ]
})

export class AdminDashboardComponent implements OnInit {

  title: string = ""
  data: IAdminDashboard[] = [];
  names: string[] = [];
  sentences: string[] = [];
  messageSender: MessageSender = new MessageSender;
  displayedColumns: string[] = ['#', 'Phone Number', 'Status', 'Messages', 'Active/Deactivate'];
  sorting: Sorting = {
    column: 'Phone Number',
    order: ''
  }

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadInitialData();
    for (let i = 0; i < 5; i++) {
      const randomName: string = uniqueNamesGenerator(customConfig);
      this.names.push(randomName.charAt(0).toUpperCase() + randomName.substring(1));
      this.sentences.push(sentence());
    }
  }

  private loadInitialData() {
    this.dataService.getData().subscribe(response => {
      this.data = response.message;
    });
  }

  private generateMessageSenders(id: number): MessageSender {
    return this.messageSender;
  }

  private sortByStatus(data: any) {
    if (this.sorting.order === 'asc')
      data.sort((a: any, b: any) => {
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

  private sortByNumber(data: any) {
    if (this.sorting.order === 'asc')
      data.sort((a: any, b: any) => a.number - b.number);
    else
      data.sort((a: any, b: any) => b.number - a.number);
  }

  isDesc(column: string): boolean {
    let desc = this.sorting.column === column && this.sorting.order === 'desc';

    return desc;
  }

  sortClick(column: string, order: string) {
    if (column === '' || order === '')
      return;

    this.sorting = {
      column: column,
      order: order
    }

    if (column === 'Status')
      this.sortByStatus(this.data);
    else if (column === 'Phone Number')
      this.sortByNumber(this.data);

  }

  onSliderChange(event: IAdminDashboard) {
    if (event.status === 'inactive')
      event.status = 'active';
    else
      event.status = 'inactive';

    this.sortClick(this.sorting.column, this.sorting.order);
  }
}
