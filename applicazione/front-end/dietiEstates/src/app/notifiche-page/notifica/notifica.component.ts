import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'
import { Appuntamento } from '../../_services/backend/appuntamento.type';
import { BackendService } from '../../_services/backend/backend.service';

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

  deleted: boolean = false; //flag di eliminazione della notifica 'notificaItem'
  showChangeOffert = false;

  changeState(newState: string){
    this.backendService.changeState(this.notificaItem.IDRichiesta, newState).subscribe({ //cerca tutte le idee controverse
      error: (err) => {
        this.toastr.error(`La notifica non è stata ${newState}`, `Errore: notifica non trovata`); //mostra un messaggio di errore
      },
      complete: () => {
        this.notificaItem.stato = newState; //aggiorna lo stato della notifica
        this.toastr.success(`La notifica è stata ${newState}`, `Risposta inviata!`);  //mostra un messaggio di successo
      }
    });
  }
}


