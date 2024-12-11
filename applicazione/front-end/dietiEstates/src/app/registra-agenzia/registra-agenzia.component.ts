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
export class RegistraAgenziaComponent {
  toastr = inject(ToastrService); //mostra le notifiche
  router = inject(Router);  //permette la navigazione
  restService = inject(BackendService); //effettua le richieste HTTP
  submitted = false;  //flag dello stato di invio del form
  showNewCredentials = false;

  nuovaAgenziaForm = new FormGroup({  //form per il sign up
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    nomeAgenzia: new FormControl('', [Validators.required]),
    indirizzoAgenzia: new FormControl('', [Validators.required]),
  });

  newGeneratedPassword: string = this.generaPassword();

  handleNuovaAgenzia() {  //gestisce il sign up
    this.submitted = true;  //aggiorna la flag dello stato di invio del form

    if (this.nuovaAgenziaForm.invalid) {  //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");  //mostra un messaggio di errore
    } else {
      this.restService.registraAgenzia({ //effettua il sign up con i dati inseriti nel form,
        email: this.nuovaAgenziaForm.value.email as string,
        nomeAgenzia: this.nuovaAgenziaForm.value.nomeAgenzia as string,
        indirizzoAgenzia: this.nuovaAgenziaForm.value.indirizzoAgenzia as string,
        username: this.nuovaAgenziaForm.value.username as string,
        password: this.newGeneratedPassword
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato da un altro utente", "Username in uso");  //mostra un messaggio di errore
        },
        complete: () => {
          this.showNewCredentials=true;
        }
      })
    }
  }//fine handleSignup

  generaPassword(): string {
    const prefisso = "agz_";
    const minPasswordLength = 4; // Lunghezza minima complessiva della password
    const maxPasswordLength = 16; // Lunghezza massima complessiva della password

    // Calcoliamo la lunghezza della parte generata casualmente
    const randomPartMinLength = Math.max(0, minPasswordLength - prefisso.length);
    const randomPartMaxLength = maxPasswordLength - prefisso.length;

    // Generiamo una lunghezza casuale per la parte casuale
    const randomPartLength = Math.floor(Math.random() * (randomPartMaxLength - randomPartMinLength + 1)) + randomPartMinLength;

    // Caratteri ammessi nella parte casuale
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    // Generiamo la parte casuale
    let randomPart = "";
    for (let i = 0; i < randomPartLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomPart += charset[randomIndex];
    }

    // Ritorniamo la password completa
    return prefisso + randomPart;
 }
}