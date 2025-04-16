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
  authService = inject(AuthService);
  backendService = inject(BackendService);
  toastr = inject(ToastrService);
  submittedNewAgenteForm = false;
  newAgenteForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])  
  })

  handleNewAgente() {
    this.submittedNewAgenteForm = true;

    if (this.newAgenteForm.invalid) {
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");
    } else {
      this.backendService.createNewAgenteByCollaboratore({
        usr: this.newAgenteForm.value.user as string,
        email: this.newAgenteForm.value.email as string,
        pwd: this.newAgenteForm.value.pass as string,
        referente: this.authService.user()
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato", "Username in uso");
        },
        complete: () => {
          this.sendEmail(this.authService.user(), this.newAgenteForm.value.email as string, this.newAgenteForm.value.user as string, this.newAgenteForm.value.pass as string);
          this.newAgenteForm.reset();
          this.submittedNewAgenteForm = false;
        }
      })
    }
  }

  sendEmail(sender: string | null, emailReciver: string, usernameReceiver: string, passwordReceiver: string){
    let message = `${sender} ha creato il tuo nuovo account di DietiEstates.\n` +
              `Per accedere, usa le seguenti credenziali:\n` +
              `Username: ${usernameReceiver}\n` +
              `Password: ${passwordReceiver}.\n`;

    this.backendService.inviaEmail({
      to: emailReciver,
      subject: "Il tuo nuovo account di DietiEstates è stato creato",
      text: message
    }).subscribe({
      error: (err) => {
        this.toastr.error("L'email non è stata inviata al nuovo utente", "Email non inviata");
      },
      complete: () => {
        this.toastr.success(`E' stata inviata una mail al tuo nuovo collaboratore`, `Registrazione effettuata`);
      }
    })
  }
}