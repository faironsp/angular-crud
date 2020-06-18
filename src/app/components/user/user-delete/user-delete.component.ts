import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

interface Schooling {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  schoolings: Schooling[] = [
    { value: 1, viewValue: 'Infantil' },
    { value: 2, viewValue: 'Fundamental' },
    { value: 3, viewValue: 'Médio' },
    { value: 4, viewValue: 'Superior' }
  ];

  user: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.userService.readById(id).subscribe(user => {
      this.user = user;
    });
  }

  deleteUser(): void {
    this.userService.delete(this.user.id).subscribe(() => {
      this.userService.showMessage('Usuário excluído com sucesso!');
      this.router.navigate(['/users']);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
