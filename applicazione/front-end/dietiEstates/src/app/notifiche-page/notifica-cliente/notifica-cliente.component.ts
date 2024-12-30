import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
import { Appuntamento } from '../../_services/backend/appuntamento.type';
import { BackendService } from '../../_services/backend/backend.service';

@Component({
  selector: 'app-notifica-cliente',
  imports: [ReactiveFormsModule],
  templateUrl: './notifica-cliente.component.html',
  styleUrl: './notifica-cliente.component.scss'
})
export class NotificaClienteComponent {
  @Input({ required: true }) notificaItem!: Appuntamento;
  
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  deleted: boolean = false; //flag di eliminazione della notifica 'notificaItem'
  showChangeOffer = false;
  submittedOfferForm = false;  //flag dello stato di invio del form
    offerForm = new FormGroup({ //form per il login
      offer: new FormControl('', [Validators.required])
    })

  deleteNotifica(){
    this.backendService.deleteNotifica(this.notificaItem.IDRichiesta).subscribe({ //cerca tutte le idee controverse
      error: (err) => {
        this.toastr.error(`La notifica non è stata eliminata`, `Errore: notifica non trovata`); //mostra un messaggio di errore
      },
      complete: () => {
        this.deleted = true; //aggiorna il flag di eliminazione
        this.toastr.success(`La notifica è stata eliminata`, `Notifica eliminata!`);  //mostra un messaggio di successo
      }
    });
  }

  changeOffer(){
    this.showChangeOffer = true;
  }

  handleChangeOffer(){
    this.submittedOfferForm = true;  //aggiorna la flag dello stato di invio del form

    if (this.offerForm.invalid) { //controlla se i dati inseriti nel form non sono validi
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");  //mostra un messaggio di errore
    } else {
      this.backendService.changeOffer(this.notificaItem.IDRichiesta, {  //effettua il login con i dati inseriti nel form
        offerta: this.offerForm.value.offer as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("Inserire un'offerta corretta.", "Errore: offerta errata"); //mostra un messaggio di errore
        },
        complete: () => {
          this.toastr.success(`Nuova offerta inviata`, `Offerta inviata!`);  //mostra un messaggio di successo
          this.notificaItem.stato = "in attesa";
          this.showChangeOffer=false;

        }
      })
    }
  }
}
