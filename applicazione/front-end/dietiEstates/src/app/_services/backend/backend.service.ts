import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from './aut-request.type';
import { GestoreAgenzia } from './gestoreAgenzia.type';
import { CollaboratoreAndAgente } from './collaboratoreAgente.type';
import { Appuntamento } from './appuntamento.type';
import { Offerta } from './offerta.type';
import { Annuncio } from './annuncio.type';

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

  changePassword(changePasswordRequest: AuthRequest){
    const url= `${this.url}/gestoreAgenziaCambioPassword`;

    return this.http.put<AuthRequest>(url, changePasswordRequest, this.httpOptions);
  }

  createNewCollaboratore(newCollaboratoreRequest: CollaboratoreAndAgente){
    const url = `${this.url}/insertCollaboratore`; //URL per la richiesta

    console.log(newCollaboratoreRequest);

    return this.http.post(url, newCollaboratoreRequest, this.httpOptions);
  }

  createNewAgenteByGestore(newAgenteRequest: CollaboratoreAndAgente){
    const url = `${this.url}/gestoreAgenzia/insertAgenteImmobiliare`; //URL per la richiesta

    console.log(newAgenteRequest);

    return this.http.post(url, newAgenteRequest, this.httpOptions);
  }

  createNewAgenteByCollaboratore(newAgenteRequest: CollaboratoreAndAgente){
    const url = `${this.url}/collaboratore/insertAgenteImmobiliare`; //URL per la richiesta

    console.log(newAgenteRequest);

    return this.http.post(url, newAgenteRequest, this.httpOptions);
  }

  getAppuntamentiWithDate(date: Date, usr: string | null){
    const stringDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    
    const url= `${this.url}/getRichiesta?sort=data&mode=asc&stato=accettata&AgenteImmobiliareUsername=${usr}&dataSelected=${stringDate}`;
    
    return this.http.get<Appuntamento[]>(url, this.httpOptions);
  }

  getUserAppuntamenti(usr: string | null, role: string | null){
    const url= `${this.url}/getRichiesta?sort=data&mode=asc&${role}=${usr}`;
    
    return this.http.get<Appuntamento[]>(url, this.httpOptions);
  }

  changeState(id: number, newState: string){
    const url= `${this.url}/cambioStato/${id}/${newState}`;

    return this.http.put(url, this.httpOptions);
  }

  deleteNotifica(id: number){
    const url= `${this.url}/deleteRichiesta/${id}`;

    return this.http.delete(url, this.httpOptions);
  }

  changeOffer(id: number, newOfferta: Offerta)  {
    const url= `${this.url}/updateRichiesta/${id}`;

    return this.http.put(url, newOfferta, this.httpOptions);
  }

  getMapConfiguration() {
    const url = `${this.url}/api/map-config`;

    return this.http.get(url, this.httpOptions);
  }
  
  getSuggestions(query: string) {
    const url = `${this.url}/autocomplete/${query}`;

    return this.http.get<any>(url, this.httpOptions);
  }

  createNewAnnuncio(newAnnuncioRequest: Annuncio){
    const url = `${this.url}/upload/${newAnnuncioRequest.immagini.length}`;
    const formData = new FormData();

    newAnnuncioRequest.immagini.forEach(image => formData.append('images', image));

    formData.append('descrizione', newAnnuncioRequest.descrizione);
    formData.append('prezzo', newAnnuncioRequest.prezzo);
    formData.append('dimensioni', newAnnuncioRequest.dimensioni);
    formData.append('indirizzo', newAnnuncioRequest.indirizzo);
    formData.append('nStanza', newAnnuncioRequest.nStanza);
    formData.append('piano', newAnnuncioRequest.piano);
    formData.append('ascensore', String(newAnnuncioRequest.ascensore));
    formData.append('classeEnergetica', newAnnuncioRequest.classeEnergetica);
    formData.append('altriServizi', newAnnuncioRequest.altriServizi);
    formData.append('categoria', newAnnuncioRequest.categoria);
    formData.append('AgenteImmobiliareUsername', newAnnuncioRequest.AgenteImmobiliareUsername ?? '');

    console.log(formData);

    return this.http.post(url, formData, this.httpOptions);
  }
}

