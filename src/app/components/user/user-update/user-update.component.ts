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

  user: User = {
    id: 0,
    name: "",
    lastName: "",
    email: "",
    birthdate: "",
    schooling: 1
  };

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.user); }

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
    /*
    if (this.nameFormControl.invalid) {
      this.matcher = new ErrorStateMatcher();
      this.nameFormControl.markAsTouched();
    }

    if (this.lastNameFormControl.invalid) {
      this.matcher = new ErrorStateMatcher();
      this.lastNameFormControl.markAsTouched();
    }

    if (this.emailFormControl.invalid) {
      this.matcher = new ErrorStateMatcher();
      this.emailFormControl.markAsTouched();
    }

    if (this.birthdateFormControl.invalid) {
      this.matcher = new ErrorStateMatcher();
      this.birthdateFormControl.markAsTouched();
      return;
    }

    if (this.nameFormControl.valid && this.lastNameFormControl.valid && this.emailFormControl.valid && this.birthdateFormControl.valid) {

    }
    */

    this.userService.update(this.user).subscribe(() => {
      this.userService.showMessage('Usuário atualizado com sucesso!');
      this.router.navigate(['/users']);
    });

  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}
