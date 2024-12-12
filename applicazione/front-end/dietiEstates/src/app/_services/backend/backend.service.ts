import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from './aut-request.type';
import { GestoreAgenzia } from './gestoreAgenzia.type';

interface FirstAccessWrapper {
  firstAccess: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  url = "http://localhost:3000"; //URL del backend 

  constructor(private http: HttpClient) { }

  httpOptions = { //configurazione delle richieste
    headers: new HttpHeaders({
      'Content-Type': 'application/json'  //le richieste saranno in JSON
    })
  };

  login(loginRequest: AuthRequest) {  //effettua il login
    const url = `${this.url}/auth`; //URL per la richiesta

    return this.http.post<string>(url, loginRequest, this.httpOptions);
  }//fine login

  signup(signupRequest: AuthRequest) { //effettua la registrazione
    const url = `${this.url}/signupCliente`; //URL per la richiesta

    console.log(signupRequest);

    return this.http.post(url, signupRequest, this.httpOptions);
  }//fine signup

  registraAgenzia(gestoreAgenzia: GestoreAgenzia) { //effettua la registrazione
    const url = `${this.url}/insertGestoreAgenzia`; //URL per la richiesta

    return this.http.post<GestoreAgenzia>(url, gestoreAgenzia, this.httpOptions);
  }//fine signup

  getFirstAccess(usr: string | null){
    const url= `${this.url}/primoAccesso/${usr}`;

    return this.http.get<boolean>(url, this.httpOptions);

  }
}

