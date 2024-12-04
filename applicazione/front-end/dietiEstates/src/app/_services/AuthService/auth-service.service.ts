import { Injectable, WritableSignal, signal, computed, effect } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { AuthState } from './auth-state.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: WritableSignal<AuthState> = signal<AuthState>({ //signal che tiene aggiornate le informazioni nel localStorage della sessione
    user: this.getUser(), //username dell'utente
    token: this.getToken(), //token della sessione
    isAuthenticated: this.verifyToken(this.getToken())  //flag di autenticazione del token
  })

  user = computed(() => this.authState().user);   //tiene aggiornato 'user' con il valore in 'this.authState'
  token = computed(() => this.authState().token);   //tiene aggiornato 'token' con il valore in 'this.authState'
  isAuthenticated = computed(() => this.authState().isAuthenticated);   //tiene aggiornato 'isAuthenticated' con il valore in 'this.authState'

  constructor() {
    effect(() => {
      const token = this.authState().token; //token della sessione aggiornato
      const user = this.authState().user; //username dell'utente aggiornato

      if (token !== null) { //controlla se il token non è NULL
        localStorage.setItem("token", token); //aggiorna il valore di "token" nel localStorage della sessione
      } else {
        localStorage.removeItem("token"); //rimuove "token" dal localStorage della sessione
      }

      if (user !== null) {  //controlla se l'username dell'utente non è NULL
        localStorage.setItem("user", user); //aggiorna il valore di "user" nel localStorage della sessione
      } else {
        localStorage.removeItem("user");  //rimuove "user" dal localStorage della sessione
      }
    });
  }

  getUser() {  //ritorna l'username dell'utente del localStorge
    return localStorage.getItem("user");
  }//fine getUser

  getToken() { //ritorna il token del localStorge
    return localStorage.getItem("token");
  }//fine getToken

  verifyToken(token: string | null): boolean {  //controlla se il token è valido
    if (token !== null) { //controlla se il token non è NULL
      try {
        const decodedToken = jwtDecode(token);  //token decofdificato
        const expiration = decodedToken.exp;  //tempo di scadenza del token

        if (expiration === undefined || Date.now() >= expiration * 1000) {  //controlla se il token è scaduto
          return false;
        } else {
          return true;
        }
      } catch (error) {  //se il token non è valido ritorna false
        return false;
      }
    }
    return false;
  }//fine verifyToken

  updateToken(token: string): void {  //decodifica e aggiorna il token
    const decodedToken: any = jwtDecode(token); //token decofdificato
    const user = decodedToken.user; //username dell'utente decodificato

    this.authState.set({  //aggiorna lo stato di autenticazione
      user: user,
      token: token,
      isAuthenticated: this.verifyToken(token)
    })
  }//fine updateToken

  isUserAuthenticated(): boolean {  //verifica se l'utente è autenticato
    return this.verifyToken(this.getToken());
  }//fine isUserAuthenticated

  logout() { //effettua il logout
    this.authState.set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }//fine logout
}
