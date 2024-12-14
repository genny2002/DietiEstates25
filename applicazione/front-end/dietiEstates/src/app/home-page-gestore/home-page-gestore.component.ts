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
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  showChangePassword = false;
  userfirstAccess: boolean = false;
  submittedPasswordForm = false;  //flag dello stato di invio del form
  passwordForm = new FormGroup({ //form per il login
    pass: new FormControl('', [ //campo di input della password
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
  })
  submittedNewCollaboratoreForm = false;  //flag dello stato di invio del form
  newCollaboratoreForm = new FormGroup({  //form per il sign up
    user: new FormControl('', [Validators.required]), //campo di input dell'username
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [ //campo di input della password
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)]) 
  })
  submittedNewAgenteForm = false;  //flag dello stato di invio del form
  newAgenteForm = new FormGroup({  //form per il sign up
    user: new FormControl('', [Validators.required]), //campo di input dell'username
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [ //campo di input della password
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])  
  })

  ngOnInit() {  //inizializza il componente
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

  handleChangePassword() { //gestisce il login
    this.submittedPasswordForm = true;  //aggiorna la flag dello stato di invio del form

    if (this.passwordForm.invalid) { //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");  //mostra un messaggio di errore
    } else {
      const user = this.authService.user();
      this.backendService.changePassword({  //effettua il login con i dati inseriti nel form
        usr: user,
        email: null,
        pwd: this.passwordForm.value.pass as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("Inserire una password corretta.", "Errore: password errata"); //mostra un messaggio di errore
        },
        complete: () => {
          this.toastr.success(`Password aggiornata`, `Registrazione terminata!`);  //mostra un messaggio di successo
          this.showChangePassword=false;
        }
      })
    }
  }//fine handleLogin

  handleNewCollaboratore() {  //gestisce il sign up
    this.submittedNewCollaboratoreForm = true;  //aggiorna la flag dello stato di invio del form

    if (this.newCollaboratoreForm.invalid) {  //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");  //mostra un messaggio di errore
    } else {
      this.backendService.createNewCollaboratore({ //effettua il sign up con i dati inseriti nel form
        usr: this.newCollaboratoreForm.value.user as string,
        email: this.newCollaboratoreForm.value.email as string,
        pwd: this.newCollaboratoreForm.value.pass as string,
        referente: this.authService.user()
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato", "Username in uso");  //mostra un messaggio di errore
        },
        complete: () => {
          this.toastr.success(`E' stata inviata una mail al tuo nuovo collaboratore`, `Registrazione effettuata`);  //mostra un messaggio di successo
          this.newCollaboratoreForm.reset();//INVIARE LA MAIL AL NUOVO UTENTE
          this.submittedNewCollaboratoreForm = false;
        }
      })
    }
  }//fine handleSignup

  handleNewAgente() {  //gestisce il sign up
    this.submittedNewAgenteForm = true;  //aggiorna la flag dello stato di invio del form

    if (this.newAgenteForm.invalid) {  //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");  //mostra un messaggio di errore
    } else {
      this.backendService.createNewAgenteByGestore({ //effettua il sign up con i dati inseriti nel form
        usr: this.newAgenteForm.value.user as string,
        email: this.newAgenteForm.value.email as string,
        pwd: this.newAgenteForm.value.pass as string,
        referente: this.authService.user()
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato", "Username in uso");  //mostra un messaggio di errore
        },
        complete: () => {
          this.toastr.success(`E' stata inviata una mail al tuo nuovo agente`, `Registrazione effettuata`);  //mostra un messaggio di successo
          this.newAgenteForm.reset();
          this.submittedNewAgenteForm = false;
          //INVIARE LA MAIL AL NUOVO UTENTE
        }
      })
    }
  }//fine handleSignup
}
