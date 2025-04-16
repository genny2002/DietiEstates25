import { Injectable, WritableSignal, signal, computed, effect } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { AuthState } from './auth-state.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState: WritableSignal<AuthState> = signal<AuthState>({
    user: this.getUser(),
    role: this.getRuolo(),
    token: this.getToken(),
    isAuthenticated: this.verifyToken(this.getToken())
  })

  user = computed(() => this.authState().user);
  token = computed(() => this.authState().token);
  isAuthenticated = computed(() => this.authState().isAuthenticated);

  constructor() {
    effect(() => {
      const token = this.authState().token; 
      const user = this.authState().user;
      const ruolo = this.authState().role;

      if (token !== null) {
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }

      if (user !== null) {
        localStorage.setItem("user", user);
      } else {
        localStorage.removeItem("user");
      }
      if (ruolo !== null) {
        localStorage.setItem("role", ruolo);
      }
      else {
        localStorage.removeItem("role");
      }
    });
  }

  getUser() {
    return localStorage.getItem("user");
  }

  getRuolo() {
    return localStorage.getItem("role");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  verifyToken(token: string | null): boolean {
    if (token !== null) {
      try {
        const decodedToken = jwtDecode(token);
        const expiration = decodedToken.exp;

        if (expiration === undefined || Date.now() >= expiration * 1000) {
          return false;
        } else {
          return true;
        }
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  updateToken(token: string): void {
    const decodedToken: any = jwtDecode(token); 
    const user = decodedToken.user;
    const ruolo = decodedToken.role;

    this.authState.set({
      user: user,
      role: ruolo,
      token: token,
      isAuthenticated: this.verifyToken(token)
    })
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken());
  }

  isUserGestoreAgenzia(): boolean {
    return this.getRuolo()=="gestoreAgenzia";
  }

  isUserAgenteImmobiliare(): boolean {
    return this.getRuolo()=="agenteImmobiliare";
  }

  isUserCliente(): boolean {
    return this.getRuolo()=="cliente";
  }

  isUserCollaboratore(): boolean {
    return this.getRuolo()=="collaboratore";
  }

  logout() {
    this.authState.set({
      user: null,
      role: null,
      token: null,
      isAuthenticated: false
    });
  }
}
