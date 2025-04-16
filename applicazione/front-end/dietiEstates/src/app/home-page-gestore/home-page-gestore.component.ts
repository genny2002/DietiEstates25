import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page-gestore',
  imports: [ReactiveFormsModule],
  templateUrl: './home-page-gestore.component.html',
  styleUrl: './home-page-gestore.component.scss'
})
export class HomePageGestoreComponent {
  authService = inject(AuthService);
  backendService = inject(BackendService);
  toastr = inject(ToastrService);
  showChangePassword = false;
  userfirstAccess: boolean = false;
  submittedPasswordForm = false;
  passwordForm = new FormGroup({
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
  })
  submittedNewCollaboratoreForm = false;
  newCollaboratoreForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)]) 
  })
  submittedNewAgenteForm = false;
  newAgenteForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])  
  })

  ngOnInit() {
    this.getUserFirstAccess();
  }

  getUserFirstAccess(){
    this.backendService.getFirstAccess(this.authService.getUser()).subscribe({
      next: (data) => {
        this.userfirstAccess = data;

        this.showChangePassword = this.userfirstAccess;
      },
      error: (err) => {
        this.toastr.error(err.message, err.statusText);
      }
    });
  }

  handleChangePassword() {
    this.submittedPasswordForm = true;

    if (this.passwordForm.invalid) {
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");
    } else {
      const user = this.authService.user();
      this.backendService.changePassword({
        usr: user,
        email: null,
        pwd: this.passwordForm.value.pass as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("Inserire una password corretta.", "Errore: password errata");
        },
        complete: () => {
          this.toastr.success(`Password aggiornata`, `Registrazione terminata!`);
          this.showChangePassword=false;
        }
      })
    }
  }

  handleNewCollaboratore() {
    this.submittedNewCollaboratoreForm = true;

    if (this.newCollaboratoreForm.invalid) {
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");
    } else {
      this.backendService.createNewCollaboratore({
        usr: this.newCollaboratoreForm.value.user as string,
        email: this.newCollaboratoreForm.value.email as string,
        pwd: this.newCollaboratoreForm.value.pass as string,
        referente: this.authService.user()
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato", "Username in uso");
        },
        complete: () => {
          this.sendEmail(this.authService.user(), this.newCollaboratoreForm.value.email as string, this.newCollaboratoreForm.value.user as string, this.newCollaboratoreForm.value.pass as string);
          this.newCollaboratoreForm.reset();
          this.submittedNewCollaboratoreForm = false;
        }
      })
    }
  }

  handleNewAgente() {
    this.submittedNewAgenteForm = true;

    if (this.newAgenteForm.invalid) {
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");
    } else {
      this.backendService.createNewAgenteByGestore({
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
