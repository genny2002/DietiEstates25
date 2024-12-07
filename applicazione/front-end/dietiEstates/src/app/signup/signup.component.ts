import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../_services/backend/backend.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  toastr = inject(ToastrService); //mostra le notifiche
  router = inject(Router);  //permette la navigazione
  restService = inject(BackendService); //effettua le richieste HTTP
  submitted = false;  //flag dello stato di invio del form
  signupForm = new FormGroup({  //form per il sign up
    user: new FormControl('', [Validators.required]), //campo di input dell'username
    pass: new FormControl('', [ //campo di input della password
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
  })

  handleSignup() {  //gestisce il sign up
    this.submitted = true;  //aggiorna la flag dello stato di invio del form

    if (this.signupForm.invalid) {  //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");  //mostra un messaggio di errore
    } else {
      this.restService.signup({ //effettua il sign up con i dati inseriti nel form
        usr: this.signupForm.value.user as string,
        pwd: this.signupForm.value.pass as string,
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

