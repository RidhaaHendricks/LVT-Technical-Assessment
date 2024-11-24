import { IAdminDashboard } from './models/admin.dashboard.model';
import { DataService } from './express-server/data.server';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, TemplateRef } from '@angular/core';
import { Sorting } from './models/sorting.model';
import { NgbModule, NgbPopoverModule, NgbModal, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IMessageSender } from './models/message-sender.model';
import { sentence } from '@ndaidong/txtgen';
import { uniqueNamesGenerator, Config, names } from 'unique-names-generator';

const customConfig: Config = {
  dictionaries: [names],
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
    NgbPaginationModule,
    NgbTypeaheadModule
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: [
    './admin-dashboard.component.css',
    '../styles.css'
  ]
})

export class AdminDashboardComponent implements OnInit {
  private modalService = inject(NgbModal);

  messageSenders: IMessageSender[] = [];
  title: string = ""
  data: IAdminDashboard[] = [];
  tempNumbers: IAdminDashboard[] = [];
  names: string[] = [];
  sentences: string[] = [];
  displayedColumns: string[] = ['#', 'Phone Number', 'Status', 'Messages', 'Active/Deactivate'];
  sorting: Sorting = {
    column: 'Phone Number',
    order: ''
  };
  closeResult = '';
  page = 1;
  pageSize = 4;
  collectionSize = 0;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.dataService.getData().subscribe(response => {
      this.data = response.message;

      this.refreshPages();
    });
  }

  private sortByStatus(tempNumbers: any) {
    if (this.sorting.order === 'asc')
      tempNumbers.sort((a: any, b: any) => {
        if (a.status < b.status) {
          return -1;
        }

        if (a.status > b.status) {
          return 1;
        }

        return 0;
      });
    else
      this.tempNumbers.sort((a: any, b: any) => {
        if (a.status < b.status) {
          return 1;
        }

        if (a.status > b.status) {
          return -1;
        }

        return 0;
      });
  }

  private sortByNumber(tempNumbers: any) {
    if (this.sorting.order === 'asc')
      tempNumbers.sort((a: any, b: any) => a.number - b.number);
    else
      tempNumbers.sort((a: any, b: any) => b.number - a.number);
  }

  private createNewUser(): IMessageSender {
    const randomName: string = uniqueNamesGenerator(customConfig);

    return {
      sender: randomName.charAt(0).toUpperCase() + randomName.substring(1),
      message: sentence()
    };
  }

  refreshPages() {
    this.collectionSize = this.data.length;

    this.tempNumbers = this.data.map((d, i) => ({ ...d })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  open(content: TemplateRef<any>, userMessages: IAdminDashboard) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
    );

    this.generateMessageSenders(userMessages);
  }

  generateMessageSenders(userMessages: IAdminDashboard) {
    this.messageSenders = [];
    for (let i = 0; i < userMessages.messages; i++) {
      this.messageSenders.push(this.createNewUser());
    }
  }

  isDesc(column: string): boolean {
    let desc = this.sorting.column === column && this.sorting.order === 'desc';

    return desc;
  }

  isInactive(status: string): boolean {
    return status === 'inactive' ? true : false;
  }

  sortClick(column: string, order: string) {
    if (column === '' || order === '')
      return;

    this.sorting = {
      column: column,
      order: order
    }

    if (column === 'Status')
      this.sortByStatus(this.tempNumbers);
    else if (column === 'Phone Number')
      this.sortByNumber(this.tempNumbers);

  }

  onSliderChange(event: IAdminDashboard) {
    if (event.status === 'inactive')
      event.status = 'active';
    else
      event.status = 'inactive';

    this.sortClick(this.sorting.column, this.sorting.order);
  }
}
