import { ANY_STATE } from '@angular/compiler/src/private_import_core';
import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';

import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  users: any = [];
  isLoading = false;

  constructor(
    private dataService: DataService,
    public toast: ToastComponent
  ) { }

  getUsers(): void {
    this.dataService.getUsers().subscribe(
      data => {
        this.users = this.sortByScore(data)
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  sortByScore(users: any) {
    users.sort((a: any, b: any) => {
      if (a.score > b.score) return -1;
      if (b.score > a.score) return 1;
      return 0;
    })
    return users;
  }

  ngOnInit(): void {
    this.getUsers();
  }
}
