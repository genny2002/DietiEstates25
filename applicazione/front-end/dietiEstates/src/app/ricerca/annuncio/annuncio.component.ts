import { Component, Input } from '@angular/core';
import { Annuncio } from '../../_services/backend/annuncio.type';

@Component({
  selector: 'app-annuncio',
  imports: [],
  templateUrl: './annuncio.component.html',
  styleUrl: './annuncio.component.scss'
})
export class AnnuncioComponent {
  @Input({ required: true }) annuncioItem!: Annuncio;
}
