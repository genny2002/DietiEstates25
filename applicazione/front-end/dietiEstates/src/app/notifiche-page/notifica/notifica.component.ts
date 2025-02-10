import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'
import { Appuntamento } from '../../_services/backend/appuntamento.type';
import { BackendService } from '../../_services/backend/backend.service';
import { AuthService } from '../../_services/AuthService/auth-service.service';

@Component({
  selector: 'app-notifica',
  imports: [CommonModule],
  templateUrl: './notifica.component.html',
  styleUrl: './notifica.component.scss'
})
export class NotificaComponent {
  @Input({ required: true }) notificaItem!: Appuntamento;

  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  authService = inject(AuthService);

  deleted: boolean = false; //flag di eliminazione della notifica 'notificaItem'
  showChangeOffert = false;

  async getCustomerEmail(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.backendService.getCustomerEmail(this.notificaItem?.ClienteUsername).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText); //mostra un messaggio di errore
          reject(err);
        }
      })  
    })
  }

  changeState(newState: string){
    this.backendService.changeState(this.notificaItem.IDRichiesta, newState).subscribe({ //cerca tutte le idee controverse
      error: (err) => {
        this.toastr.error(`La notifica non è stata ${newState}`, `Errore: notifica non trovata`); //mostra un messaggio di errore
      },
      complete: async () => {
        try{
          this.notificaItem.stato = newState; //aggiorna lo stato della notifica
          
          const emailReciver = await this.getCustomerEmail();
          
          this.sendEmail(this.authService.user(), emailReciver, this.notificaItem.data, this.notificaItem.Annuncio.indirizzo, newState);
        }catch(err){
          this.toastr.error("Errore durante il recupero dell'email del cliente", "Errore");
        }
      }
    });
  }

  sendEmail(usernameSender: string | null, emailReciver: string, date: Date, address: string, state: string){
    const dateString: string = date.toString(); // Ad esempio: "2025-02-14T09:00:00.000Z"
    const [day, time] = dateString.split('T'); // Divide la stringa in data e orario
    const cleanTime = time.split('.')[0]; // Rimuove i millisecondi

    let message = `La tua richiesta per visitare l'immobile a ${address} il giorno ${day} alle ore ${cleanTime} è stata ${state} da ${usernameSender}.\n`

    if(state=="rifiutata"){
      message = message + `Accedi alle notifiche del tuo account DietiEstates per inviare una nuova offerta all'agente immobiliare.`
    }

    this.backendService.inviaEmail({ //effettua il sign up con i dati inseriti nel form
      to: emailReciver,
      subject: `Richiesta ${state}`,
      text: message
    }).subscribe({
      error: (err) => {
        this.toastr.error("L'email non è stata inviata al cliente", "Email non inviata");  //mostra un messaggio di errore
      },
      complete: () => {
        this.toastr.success(`La notifica è stata ${state}`, `Risposta inviata!`);  //mostra un messaggio di successo
      }
    })
  }
}


