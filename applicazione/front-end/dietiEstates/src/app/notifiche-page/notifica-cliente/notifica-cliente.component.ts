import { Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
  
  backendService = inject(BackendService);
  toastr = inject(ToastrService);
  deleted: boolean = false;
  showChangeTime = false;
  showMessage = false;
  orari: Disponibilita[] = [];
  

  async ngOnInit() {
    this.initOrari();
  }

  deleteNotifica(){
    this.backendService.deleteNotifica(this.notificaItem.IDRichiesta).subscribe({
      error: (err) => {
        this.toastr.error(`La notifica non è stata eliminata`, `Errore: notifica non trovata`);
      },
      complete: () => {
        this.deleted = true;
        this.toastr.success(`La notifica è stata eliminata`, `Notifica eliminata!`);
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
    this.notificaItem.data.setUTCHours(newTime);
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
