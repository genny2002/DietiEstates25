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
  submitted = false;  //flag dello stato di invio del form
  passwordForm = new FormGroup({ //form per il login
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
    this.submitted = true;  //aggiorna la flag dello stato di invio del form

    if (this.passwordForm.invalid) { //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");  //mostra un messaggio di errore
    } else {
      this.backendService.changePassword({  //effettua il login con i dati inseriti nel form
        usr: this.authService.getUser(),
        email: null,
        pwd: this.passwordForm.value.pass as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("Inserire username e password corretti.", "Errore: credenziali errate"); //mostra un messaggio di errore
        },
        complete: () => {
          this.toastr.success(`Password aggiornata`, `Registrazione terminata!`);  //mostra un messaggio di successo
          this.showChangePassword=false;
        }
      })
    }
  }//fine handleLogin
}
