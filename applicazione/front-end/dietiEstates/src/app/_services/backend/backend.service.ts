import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from './aut-request.type';
import { GestoreAgenzia } from './gestoreAgenzia.type';
import { CollaboratoreAndAgente } from './collaboratoreAgente.type';
import { Appuntamento } from './appuntamento.type';
import { Offerta } from './offerta.type';
import { Annuncio, AnnuncioGet } from './annuncio.type';
import { Filtro } from './filtro.type';
import { ApiMeteoResponse } from './meteo.type';
import { Disponibilita } from './disponibilita.type';
import { Richiesta } from './richiesta.type';
import { Email } from './email.type'

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
    const url = `${this.url}/upload/${newAnnuncioRequest.foto.length}`;
    const formData = new FormData();

    newAnnuncioRequest.foto.forEach((image, index) => {
      formData.append('foto', image, image.name); // 'foto' field name
    });

    formData.append('descrizione', newAnnuncioRequest.descrizione);
    formData.append('prezzo', newAnnuncioRequest.prezzo);
    formData.append('dimensioni', newAnnuncioRequest.dimensioni);
    formData.append('indirizzo', newAnnuncioRequest.indirizzo);
    formData.append('numeroStanze', newAnnuncioRequest.numeroStanze);
    formData.append('piano', newAnnuncioRequest.piano);
    formData.append('ascensore', String(newAnnuncioRequest.ascensore));
    formData.append('classeEnergetica', newAnnuncioRequest.classeEnergetica);
    formData.append('altriServizi', newAnnuncioRequest.altriServizi);
    formData.append('categoria', newAnnuncioRequest.categoria);
    formData.append('AgenteImmobiliareUsername', newAnnuncioRequest.AgenteImmobiliareUsername ?? '');

    return this.http.post(url, formData);
  }

  getAnnunci(){
    const url= `${this.url}/download/annunci?sort=prezzo&mode=desc`;
    
    return this.http.get<AnnuncioGet[]>(url, this.httpOptions);
  }

  getAnnunciWithFilter(filtro: Filtro){
    let url= `${this.url}/download/annunci?sort=prezzo&mode=desc`;

    if(filtro.indirizzo)
    {
      url=`${url}&indirizzo=${filtro.indirizzo}`;
    }
    if(filtro.categoria)
    {
      url=`${url}&categoria=${filtro.categoria}`;
    }
    if(filtro.servizi.ascensore)
    {
      url=`${url}&ascensore=${filtro.servizi.ascensore}`;
    }
    if(filtro.servizi.climatizzazione || filtro.servizi.portineria)
    {
      url=`${url}&altriServizi=`

      if(filtro.servizi.climatizzazione)
      {
        url=`${url}climatizzazione:true`;
      }
      if(filtro.servizi.portineria)
      {
        url=`${url}portineria:true`;
      }
    }
    if(filtro.prezzoMin)
    {
      url=`${url}&prezzoMin=${filtro.prezzoMin}`;
    }
    if(filtro.prezzoMax)
    {
      url=`${url}&prezzoMax=${filtro.prezzoMax}`;
    }
    if(filtro.numeroStanze)
    {
      url=`${url}&numeroStanze=${filtro.numeroStanze}`;
    }
    if(filtro.piano)
    {
      url=`${url}&piano=${filtro.piano}`;
    }
    if(filtro.dimensioni)
    {
      url=`${url}&dimensioni=${filtro.dimensioni}`;
    }
    if(filtro.classeEnergetica)
    {
      url=`${url}&classeEnergetica=${filtro.classeEnergetica}`;
    }

    return this.http.get<AnnuncioGet[]>(url, this.httpOptions);
  }

  getCoordinates(indirizzo: String){ 
    const url = `${this.url}/geocode/${indirizzo}`;

    return this.http.get<{ latitude: number, longitude: number }[]>(url, this.httpOptions);
  }

  getAnnuncioToShow(id: number){
    const url= `${this.url}/download/annunci?id=${id}`;

    return this.http.get<AnnuncioGet[]>(url, this.httpOptions);
  }
  
  getMeteo(lat: number, lon: number){
    const url= `${this.url}/meteo/${lat}/${lon}`;

    return this.http.get<ApiMeteoResponse>(url, this.httpOptions);
  }

  getDisponibilita(usr: string, data: string){
    const url= `${this.url}/getRichiesteGiornoX/${usr}/${data}`;

    return this.http.get<Disponibilita[]>(url, this.httpOptions);
  }

  createRichiesta(richiesta: Richiesta){
    const url = `${this.url}/insertRichiesta`; //URL per la richiesta
    console.log(richiesta.data);
    return this.http.post(url, richiesta, this.httpOptions);
  }

  inviaEmail(email: Email){
    const url = `${this.url}/sendEmail`; //URL per la richiesta

    return this.http.post(url, email, this.httpOptions);
  }

  getUserEmail(username: string | null){
    const url = `${this.url}/getCliente/${username}`;

    return this.http.get<string>(url, this.httpOptions);
  }

  getAgentEmail(username: string | null | undefined){
    const url = `${this.url}/getAgente/${username}`;

    return this.http.get<string>(url, this.httpOptions);
  }
}

