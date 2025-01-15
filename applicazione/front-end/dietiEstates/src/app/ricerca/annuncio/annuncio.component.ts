import { Component, Input } from '@angular/core';
import { Annuncio } from '../../_services/backend/annuncio.type';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-annuncio',
  imports: [NgOptimizedImage],
  templateUrl: './annuncio.component.html',
  styleUrl: './annuncio.component.scss'
})
export class AnnuncioComponent {
  @Input({ required: true }) annuncioItem!: Annuncio;
}
