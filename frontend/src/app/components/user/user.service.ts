import { map, catchError } from 'rxjs/operators';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //URL da Api do json-server (apenas para rodar o projeto sem necessidade do Sql Server)
  baseUrl: string = 'http://localhost:3001/users';

  //URL da Api do Rodando a API .Net Core Local com Sql Server instalado e banco de dados criado
  //baseUrl: string = 'http://localhost:55419/users';
  //Link para baixar o projeto do Git: https://github.com/faironsp/netcore-api

  //URL da API publicada no Azure (Utilizei minha conta particular de Dev)
  //baseUrl: string = 'https://fairon.azurewebsites.net/users';

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient) { }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user, { withCredentials: true }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  read(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl, { withCredentials: true }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url, { withCredentials: true }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  update(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.id}`;
    return this.http.put<User>(url, user, { withCredentials: true }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  delete(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<User>(url, { withCredentials: true }).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMessage('Ocorreu um erro!', true);
    return EMPTY;
  }
}