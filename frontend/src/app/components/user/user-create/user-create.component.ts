import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../user.service';
import { User } from '../user.model';

interface Schooling {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  schoolings: Schooling[] = [
    { value: 1, viewValue: 'Infantil' },
    { value: 2, viewValue: 'Fundamental' },
    { value: 3, viewValue: 'Médio' },
    { value: 4, viewValue: 'Superior' }
  ];

  user: User = {
    id: 0,
    name: "",
    lastname: "",
    email: "",
    birthdate: "",
    schooling: 1
  };

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {

  }

  createUser(): void {
    this.userService.create(this.user).subscribe(() => {
      this.userService.showMessage('Usuário cadastrado com sucesso!');
      this.router.navigate(['/users']);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}