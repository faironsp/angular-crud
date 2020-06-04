import { User } from '../user.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { UserReadDataSource } from './user-read-datasource';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css']
})
export class UserReadComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<User>;
  dataSource: UserReadDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'lastname', 'email', 'birthdate', 'schooling', 'action'];

  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.read().subscribe(users => {
      this.users = users;

      this.dataSource = new UserReadDataSource(this.users);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    });
  }

  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
    //this.table.dataSource = this.dataSource;
  }
}
