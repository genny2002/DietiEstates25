import { Component, Input, inject} from '@angular/core';
import { AnnuncioGet } from '../../_services/backend/annuncio.type';
import { NgOptimizedImage } from '@angular/common'
import { ToastrService } from 'ngx-toastr'
import { BackendService } from '../../_services/backend/backend.service';

interface Servizio {
  nome: string;
  valore: string;
  nomeFile: string;
}

@Component({
  selector: 'app-immobile',
  imports: [NgOptimizedImage],
  templateUrl: './immobile.component.html',
  styleUrl: './immobile.component.scss'
})
export class ImmobileComponent {
  @Input({ required: true }) immobileItem!: AnnuncioGet;

  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
 
  servizi: Servizio[] = []
  showMessage = false;
  deleted: boolean = false;

  ngOnInit(){
    const pairs = this.immobileItem.altriServizi.split('-');
    
    this.servizi = pairs.map(pair => {
      const [nome, valore] = pair.split(':');
    
      return { 
        nome, 
        valore, 
        nomeFile: `${nome}.png` 
      };
    });
  }

  allert(){
    this.showMessage = true;
  }

  deleteAnnuncio(){
    this.backendService.deleteAnnuncio(this.immobileItem.IDimmobile).subscribe({ //cerca tutte le idee controverse
      error: (err) => {
        this.toastr.error(`L'annuncio non è stato eliminato`, `Errore: annuncio non trovato`); //mostra un messaggio di errore
      },
      complete: () => {
        this.deleted = true; //aggiorna il flag di eliminazione
        this.toastr.success(`L'annuncio è stato eliminato`, `Annuncio eliminato!`);  //mostra un messaggio di successo
        this.showMessage = false;
      }
    });
  }

  cancel(){
    this.showMessage = false;
  }
}
