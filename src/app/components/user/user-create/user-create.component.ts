import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { User } from '../user.model';

interface Schooling {
  value: number;
  viewValue: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  nameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  lastNameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  birthdateFormControl = new FormControl('', [
    Validators.required
  ]);

  matcher = new MyErrorStateMatcher();

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

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createUser(): void {
    if (this.nameFormControl.invalid) {
      this.matcher = new MyErrorStateMatcher();
      this.nameFormControl.markAsTouched();
    }

    if (this.lastNameFormControl.invalid) {
      this.matcher = new MyErrorStateMatcher();
      this.lastNameFormControl.markAsTouched();
    }

    if (this.emailFormControl.invalid) {
      this.matcher = new MyErrorStateMatcher();
      this.emailFormControl.markAsTouched();
    }

    if (this.birthdateFormControl.invalid) {
      this.matcher = new MyErrorStateMatcher();
      this.birthdateFormControl.markAsTouched();
      return;
    }

    if (this.nameFormControl.valid && this.lastNameFormControl.valid && this.emailFormControl.valid && this.birthdateFormControl.valid) {
      this.userService.create(this.user).subscribe(() => {
        this.userService.showMessage('Usuário cadastrado com sucesso!');
        this.router.navigate(['/users']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/users']);
  }
}