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

  backendService = inject(BackendService);
  toastr = inject(ToastrService);
  authService = inject(AuthService);

  deleted: boolean = false;
  showChangeOffert = false;

  async getCustomerEmail(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.backendService.getCustomerEmail(this.notificaItem?.ClienteUsername).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
          reject(err);
        }
      })  
    })
  }

  changeState(newState: string){
    this.backendService.changeState(this.notificaItem.IDRichiesta, newState).subscribe({
      error: (err) => {
        this.toastr.error(`La notifica non è stata ${newState}`, `Errore: notifica non trovata`);
      },
      complete: async () => {
        try{
          this.notificaItem.stato = newState;
          
          const emailReciver = await this.getCustomerEmail();
          
          this.sendEmail(this.authService.user(), emailReciver, this.notificaItem.data, this.notificaItem.Annuncio.indirizzo, newState);
        }catch(err){
          this.toastr.warning("L'email non è stata inviata al cliente", "Email non inviata");
        }
      }
    });
  }

  sendEmail(usernameSender: string | null, emailReciver: string, date: Date, address: string, state: string){
    const dateString: string = date.toString(); 
    const [day, time] = dateString.split('T');
    const cleanTime = time.split('.')[0];

    let message = `La tua richiesta per visitare l'immobile a ${address} il giorno ${day} alle ore ${cleanTime} è stata ${state} da ${usernameSender}.\n`

    if(state=="rifiutata"){
      message = message + `Accedi alle notifiche del tuo account DietiEstates per inviare una nuova offerta all'agente immobiliare.`
    }

    this.backendService.inviaEmail({
      to: emailReciver,
      subject: `Richiesta ${state}`,
      text: message
    }).subscribe({
      error: (err) => {
        this.toastr.warning("L'email non è stata inviata al cliente", "Email non inviata");
      },
      complete: () => {
        this.toastr.success(`La notifica è stata ${state}`, `Risposta inviata!`);
      }
    })
  }
}


