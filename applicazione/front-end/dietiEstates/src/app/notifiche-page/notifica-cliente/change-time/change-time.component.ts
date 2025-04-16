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

  backendService = inject(BackendService);
  toastr = inject(ToastrService);

  submittedTimeForm = false;
  timeForm = new FormGroup({
    orario: new FormControl('', [Validators.required]),
  })

  handleChangeTime(){
    this.submittedTimeForm = true;

    if (this.timeForm.invalid) {
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");
    } else {
      this.backendService.changeTime(this.notificaItem.IDRichiesta, {
        orario: this.timeForm.value.orario as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("Inserire un orario corretta.", "Errore: orario errato");
        },
        complete: () => {
          let orarioString = this.timeForm.value.orario as string;
          const orarioNumber = Number(orarioString.substring(0,2));
          
          this.toastr.success(`Nuova Richiesta inviata`, `Richiesta inviata!`);
          this.notificaModificata.emit(orarioNumber);
        }
      })
    }
  }

  cancel(){
    this.modificaAnnullata.emit();
  }
}
