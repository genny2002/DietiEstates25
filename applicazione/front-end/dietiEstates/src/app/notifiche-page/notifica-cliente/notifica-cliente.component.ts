import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr'
import { Appuntamento } from '../../_services/backend/appuntamento.type';
import { BackendService } from '../../_services/backend/backend.service';
import { Disponibilita } from '../../_services/backend/disponibilita.type';
import { ChangeTimeComponent } from './change-time/change-time.component';

@Component({
  selector: 'app-notifica-cliente',
  imports: [ReactiveFormsModule, CommonModule, ChangeTimeComponent],
  templateUrl: './notifica-cliente.component.html',
  styleUrl: './notifica-cliente.component.scss'
})
export class NotificaClienteComponent {
  @Input({ required: true }) notificaItem!: Appuntamento;
  
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  deleted: boolean = false; //flag di eliminazione della notifica 'notificaItem'
  showChangeTime = false;
  showMessage = false;
  orari: Disponibilita[] = [];
  

  async ngOnInit() {  //inizializza il componente
    this.initOrari();
  }

  deleteNotifica(){
    this.backendService.deleteNotifica(this.notificaItem.IDRichiesta).subscribe({ //cerca tutte le idee controverse
      error: (err) => {
        this.toastr.error(`La notifica non è stata eliminata`, `Errore: notifica non trovata`); //mostra un messaggio di errore
      },
      complete: () => {
        this.deleted = true; //aggiorna il flag di eliminazione
        this.toastr.success(`La notifica è stata eliminata`, `Notifica eliminata!`);  //mostra un messaggio di successo
        this.showMessage = false;
      }
    });
  }

  changeTime(){
    this.showChangeTime = true;
  }

  initOrari(){
    if(this.notificaItem.AgenteImmobiliareUsername){
      this.backendService.getDisponibilita(this.notificaItem.AgenteImmobiliareUsername, this.notificaItem.data).subscribe({
        next: (data) => {
          this.orari = data;
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
        }
      });
    }
  }

  terminaModifica(newTime: number){
    this.notificaItem.stato = "in attesa";
    this.notificaItem.data= new Date(this.notificaItem.data); 
    this.notificaItem.data.setUTCHours(newTime); // Imposta l'orario
    this.showChangeTime = false;
  }

  allert(){
    this.showMessage = true;
  }

  cancel(){
    this.showChangeTime = false;
    this.showMessage = false;
  }
}
