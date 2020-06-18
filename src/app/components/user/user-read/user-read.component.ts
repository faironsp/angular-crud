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
  displayedColumns = ['id', 'name', 'lastName', 'email', 'birthdate', 'schooling', 'action'];

  users: User[];

  getSchoolingDescription(schooling: number): string {
    switch (schooling) {
      case 1:
        return "Infantil";
        break;
      case 2:
        return "Fundamental";
        break;
      case 3:
        return "Médio";
        break;
      case 4:
        return "Superior";
        break;
      default:
        return "Erro: " + schooling;
        break;
    };
  }



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
