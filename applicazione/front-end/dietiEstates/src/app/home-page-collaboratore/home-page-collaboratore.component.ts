import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page-collaboratore',
  imports: [ReactiveFormsModule],
  templateUrl: './home-page-collaboratore.component.html',
  styleUrl: './home-page-collaboratore.component.scss'
})
export class HomePageCollaboratoreComponent {
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  submittedNewAgenteForm = false;  //flag dello stato di invio del form
  newAgenteForm = new FormGroup({  //form per il sign up
    user: new FormControl('', [Validators.required]), //campo di input dell'username
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [ //campo di input della password
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])  
  })

  handleNewAgente() {  //gestisce il sign up
    this.submittedNewAgenteForm = true;  //aggiorna la flag dello stato di invio del form

    if (this.newAgenteForm.invalid) {  //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");  //mostra un messaggio di errore
    } else {
      this.backendService.createNewAgenteByCollaboratore({ //effettua il sign up con i dati inseriti nel form
        usr: this.newAgenteForm.value.user as string,
        email: this.newAgenteForm.value.email as string,
        pwd: this.newAgenteForm.value.pass as string,
        referente: this.authService.user()
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato", "Username in uso");  //mostra un messaggio di errore
        },
        complete: () => {
          this.sendEmail(this.authService.user(), this.newAgenteForm.value.email as string, this.newAgenteForm.value.user as string, this.newAgenteForm.value.pass as string);
          this.newAgenteForm.reset();
          this.submittedNewAgenteForm = false;
        }
      })
    }
  }//fine handleSignup

  sendEmail(sender: string | null, emailReciver: string, usernameReceiver: string, passwordReceiver: string){
    let message = `${sender} ha creato il tuo nuovo account di DietiEstates.\n` +
              `Per accedere, usa le seguenti credenziali:\n` +
              `Username: ${usernameReceiver}\n` +
              `Password: ${passwordReceiver}.\n`;

    this.backendService.inviaEmail({ //effettua il sign up con i dati inseriti nel form
      to: emailReciver,
      subject: "Il tuo nuovo account di DietiEstates è stato creato",
      text: message
    }).subscribe({
      error: (err) => {
        this.toastr.error("L'email non è stata inviata al nuovo utente", "Email non inviata");  //mostra un messaggio di errore
      },
      complete: () => {
        this.toastr.success(`E' stata inviata una mail al tuo nuovo collaboratore`, `Registrazione effettuata`);  //mostra un messaggio di successo
      }
    })
  }
}
