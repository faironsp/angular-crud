import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';

interface Schooling {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

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

  updateUser(): void {
    this.userService.update(this.user).subscribe(() => {
      this.userService.showMessage('Usuário atualizado com sucesso!');
      this.router.navigate(['/users']);
    });
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
