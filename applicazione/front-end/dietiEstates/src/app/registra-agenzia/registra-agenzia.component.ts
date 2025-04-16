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
  toastr = inject(ToastrService);
  router = inject(Router);
  restService = inject(BackendService);
  submitted = false; 
  showNewCredentials = false;

  nuovaAgenziaForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    nomeAgenzia: new FormControl('', [Validators.required]),
    indirizzoAgenzia: new FormControl('', [Validators.required]),
  });

  newGeneratedPassword: string = this.generaPassword();

  ngOnInit() {

  }

  handleNuovaAgenzia() {
    this.submitted = true;

    if (this.nuovaAgenziaForm.invalid) {
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");
    } else {
      this.restService.registraAgenzia({
        email: this.nuovaAgenziaForm.value.email as string,
        nomeAgenzia: this.nuovaAgenziaForm.value.nomeAgenzia as string,
        indirizzoAgenzia: this.nuovaAgenziaForm.value.indirizzoAgenzia as string,
        username: this.nuovaAgenziaForm.value.username as string,
        password: this.newGeneratedPassword
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato da un altro utente", "Username in uso");
        },
        complete: () => {
          this.showNewCredentials=true;
        }
      })
    }
  }

  generaPassword(): string {
    const prefisso = "agz_";
    const minPasswordLength = 4;
    const maxPasswordLength = 16;
    const randomPartMinLength = Math.max(0, minPasswordLength - prefisso.length);
    const randomPartMaxLength = maxPasswordLength - prefisso.length;
    const randomPartLength = Math.floor(Math.random() * (randomPartMaxLength - randomPartMinLength + 1)) + randomPartMinLength;
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let randomPart = "";

    for (let i = 0; i < randomPartLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);

        randomPart += charset[randomIndex];
    }

    return prefisso + randomPart;
 }
}