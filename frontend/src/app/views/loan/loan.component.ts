import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConvertActionBindingResult } from '@angular/compiler/src/compiler_util/expression_converter';

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent implements OnInit {

  txtValorSolicitado = new FormControl('', [
    Validators.required
  ]);

  txtTaxaDeJuros = new FormControl('', [
    Validators.required
  ]);

  txtNumeroDeParcelas = new FormControl('', [
    Validators.required
  ]);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  simulate() {

    if (this.txtValorSolicitado.invalid) {
      this.txtValorSolicitado.markAsTouched();
    }

    if (this.txtTaxaDeJuros.invalid) {
      this.txtTaxaDeJuros.markAsTouched();
    }

    if (this.txtNumeroDeParcelas.invalid) {
      this.txtNumeroDeParcelas.markAsTouched();
    }

    if (this.txtValorSolicitado.valid && this.txtTaxaDeJuros.valid && this.txtNumeroDeParcelas.valid) {
      this.setApiUrlBase();
    }
  }

  clear() {
    this.value = '';
    this.txtValorSolicitado.reset();
    this.txtTaxaDeJuros.reset();
    this.txtNumeroDeParcelas.reset();
  }

  private async setApiUrlBase() {
    await this.get().then(
      response => {
        //preenche a tela
        this.value = `Serão ${this.txtNumeroDeParcelas.value}x de R$ ` + response;
      },
      err => {
        // Promise fail error handling
      }
    );
  }

  private get(): Promise<Response> {
    const url = `https://fairon.azurewebsites.net/loans`;

    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('pv', this.txtValorSolicitado.value);
    params = params.append('i', this.txtTaxaDeJuros.value);
    params = params.append('n', this.txtNumeroDeParcelas.value);

    return new Promise(resolve => {
      let r: any;
      this.http.get(url, { params: params }).subscribe(
        response => {
          r = response;
        },
        error => {
          // Config error handling
        },
        () => {
          resolve(r);
        }
      )
    });
  }

  private _value: string;
  public get value(): string {
    return this._value;
  }
  public set value(v: string) {
    this._value = v;
  }
}