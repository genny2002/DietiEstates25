import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../_services/backend/backend.service';

@Component({
  selector: 'app-registraAgenzia',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './registra-agenzia.component.html',
  styleUrl: './registra-agenzia.component.scss'
})
export class SignupComponent {
  toastr = inject(ToastrService); //mostra le notifiche
  router = inject(Router);  //permette la navigazione
  restService = inject(BackendService); //effettua le richieste HTTP
  submitted = false;  //flag dello stato di invio del form
  nuovaAgenziaForm = new FormGroup({  //form per il sign up
    email: new FormControl('', [Validators.required]),
    nomeAgenzia: new FormControl('', [Validators.required]),
    indirizzoAgenzia: new FormControl('', [Validators.required]),
  })

  handleSignup() {  //gestisce il sign up
    this.submitted = true;  //aggiorna la flag dello stato di invio del form

    if (this.nuovaAgenziaForm.invalid) {  //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");  //mostra un messaggio di errore
    } else {
      this.restService.registraAgenzia({ //effettua il sign up con i dati inseriti nel form,
        email: this.nuovaAgenziaForm.value.email as string,
        nomeAgenzia: this.nuovaAgenziaForm.value.nomeAgenzia as string,
        indirizzoAgenzia: this.nuovaAgenziaForm.value.indirizzoAgenzia as string,
        username: this.generaUsername(this.nuovaAgenziaForm.value.nomeAgenzia as string),
        password: this.generaPassword()
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato da un altro utente", "Username in uso");  //mostra un messaggio di errore
        },
        complete: () => {
          this.toastr.success(`Puoi effettuare il login con il tuo nuovo username`, `Sign up effettuato`);  //mostra un messaggio di successo
          this.router.navigateByUrl("/login");  //naviga alla pagina "/login"
        }
      })
    }
  }//fine handleSignup
}