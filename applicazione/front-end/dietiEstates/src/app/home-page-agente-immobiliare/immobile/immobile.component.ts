import { Component, Input, inject, Output, EventEmitter} from '@angular/core';
import { AnnuncioGet } from '../../_services/backend/annuncio.type';
import { NgOptimizedImage } from '@angular/common'
import { ToastrService } from 'ngx-toastr'
import { BackendService } from '../../_services/backend/backend.service';
import { AuthService } from '../../_services/AuthService/auth-service.service';

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
  @Output() immobileEliminato = new EventEmitter<void>();

  authService = inject(AuthService);
  backendService = inject(BackendService);
  toastr = inject(ToastrService);
 
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
    this.backendService.deleteAnnuncio(this.immobileItem.IDimmobile, this.authService.user()).subscribe({
      error: (err) => {
        this.toastr.error(`L'annuncio non è stato eliminato`, `Errore: annuncio non trovato`);
      },
      complete: () => {
        this.deleted = true;
        this.toastr.success(`L'annuncio è stato eliminato`, `Annuncio eliminato!`);
        this.showMessage = false;
        this.immobileEliminato.emit();
      }
    });
  }

  cancel(){
    this.showMessage = false;
  }
}
