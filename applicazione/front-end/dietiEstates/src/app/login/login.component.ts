import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  toastr = inject(ToastrService); //mostra le notifiche
  router = inject(Router);  //permette la navigazione
  backendService = inject(BackendService); //effettua le richieste HTTP
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  submitted = false;  //flag dello stato di invio del form
  loginForm = new FormGroup({ //form per il login
    user: new FormControl('', [Validators.required]), //campo di input dell'username
    pass: new FormControl('', [ //campo di input della password
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
  })

  handleLogin() { //gestisce il login
    this.submitted = true;  //aggiorna la flag dello stato di invio del form

    if (this.loginForm.invalid) { //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");  //mostra un messaggio di errore
    } else {
      this.backendService.login({  //effettua il login con i dati inseriti nel form
        usr: this.loginForm.value.user as string,
        email: null, 
        pwd: this.loginForm.value.pass as string,
      }).subscribe({
        next: (token) => {
          this.authService.updateToken(token);  //aggiorna il token
          
        },
        error: (err) => {
          this.toastr.error("Inserire username e password corretti.", "Errore: credenziali errate"); //mostra un messaggio di errore
        },
        complete: () => {
          this.toastr.success(`Accesso effettuato correttamente`, `Benvenuto ${this.loginForm.value.user}!`);  //mostra un messaggio di successo

          const role = this.authService.authState().role;

          switch (role) {
            case "gestoreAgenzia":
              this.router.navigateByUrl("/homePageGestore");
              break;
            case "agenteImmobiliare":
              this.router.navigateByUrl("/homePageAgenteImmobiliare");
              break;
            case "cliente":
              this.router.navigateByUrl("/homePageCliente");
              break;
            default:
              console.error("Ruolo non riconosciuto:", role);
          }
        }
      })
    }
  }//fine handleLogin
}
