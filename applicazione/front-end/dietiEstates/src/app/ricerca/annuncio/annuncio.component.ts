import { Component, Input} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AnnuncioGet } from '../../_services/backend/annuncio.type';
import { NgOptimizedImage } from '@angular/common'

interface Servizio {
  nome: string;
  valore: string;
  nomeFile: string;
}

@Component({
  selector: 'app-annuncio',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './annuncio.component.html',
  styleUrl: './annuncio.component.scss'
})
export class AnnuncioComponent {
  @Input({ required: true }) annuncioItem!: AnnuncioGet;

  editLink = "";
  servizi: Servizio[] = []

  ngOnInit(){
    this.editLink = "/immobile/" + this.annuncioItem?.IDimmobile;  //inizializza 'editLink'

    const pairs = this.annuncioItem.altriServizi.split('-');
    
    this.servizi = pairs.map(pair => {
      const [nome, valore] = pair.split(':');
    
      return { 
        nome, 
        valore, 
        nomeFile: `${nome}.png` 
      };
    });
  }
}
