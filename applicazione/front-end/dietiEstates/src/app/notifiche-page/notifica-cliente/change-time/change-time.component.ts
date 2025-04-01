import { Component, Input, inject, Output, EventEmitter } from '@angular/core';
import { Disponibilita } from '../../../_services/backend/disponibilita.type';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Appuntamento } from '../../../_services/backend/appuntamento.type';
import { ToastrService } from 'ngx-toastr'
import { BackendService } from '../../../_services/backend/backend.service';

@Component({
  selector: 'app-change-time',
  imports: [ReactiveFormsModule],
  templateUrl: './change-time.component.html',
  styleUrl: './change-time.component.scss'
})
export class ChangeTimeComponent {
  @Input() orari!: Disponibilita[];
  @Input() notificaItem!: Appuntamento;
  @Output() notificaModificata = new EventEmitter<number>();
  @Output() modificaAnnullata = new EventEmitter<void>(); 

  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche

  submittedTimeForm = false;  //flag dello stato di invio del form
  timeForm = new FormGroup({ //form per il login
    orario: new FormControl('', [Validators.required]), //campo di input dell'username
  })

  handleChangeTime(){
    this.submittedTimeForm = true;  //aggiorna la flag dello stato di invio del form

    if (this.timeForm.invalid) { //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");  //mostra un messaggio di errore
    } else {
      this.backendService.changeTime(this.notificaItem.IDRichiesta, {  //effettua il login con i dati inseriti nel form
        orario: this.timeForm.value.orario as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("Inserire un orario corretta.", "Errore: orario errato"); //mostra un messaggio di errore
        },
        complete: () => {
          let orarioString = this.timeForm.value.orario as string; //trasforma l'orario in una stringa
          const orarioNumber = Number(orarioString.substring(0,2)); //trasforma l'orario in un numero
          
          this.toastr.success(`Nuova Richiesta inviata`, `Richiesta inviata!`);  //mostra un messaggio di successo
          this.notificaModificata.emit(orarioNumber);
        }
      })
    }
  }

  cancel(){
    this.modificaAnnullata.emit();
  }
}
