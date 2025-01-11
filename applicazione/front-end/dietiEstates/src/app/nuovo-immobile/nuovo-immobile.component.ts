import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {IntercativeMapComponent} from './intercative-map/intercative-map.component';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { Annuncio } from '../_services/backend/annuncio.type';

@Component({
  selector: 'app-nuovo-immobile',
  imports: [ReactiveFormsModule, RouterLink, IntercativeMapComponent],
  templateUrl: './nuovo-immobile.component.html',
  styleUrl: './nuovo-immobile.component.scss'
})
export class NuovoImmobileComponent {
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  router = inject(Router);  //permette la navigazione
  step: number = 1;

  submittedStep1 = false;  //flag dello stato di invio del form
    step1Form = new FormGroup({ //form per il login
      tipo: new FormControl('', [Validators.required]), //campo di input dell'username
      prezzo: new FormControl('', [Validators.required]),
      descrizione: new FormControl('', [Validators.required]),
      numeroStanze: new FormControl('', [Validators.required]),
      dimensioni: new FormControl('', [Validators.required]),
    })

  submittedStep2 = false;  //flag dello stato di invio del form
  step2Form = new FormGroup({ //form per il login
    immagini: new FormControl('', [Validators.required]), //campo di input dell'username
    servizi: new FormGroup({
      ascensore: new FormControl('', [Validators.required]),
      portineria: new FormControl('', [Validators.required]),
      climatizzazione: new FormControl('', [Validators.required]),
    }),
    classeEnergetica: new FormControl('', [Validators.required]),
    piano: new FormControl('', [Validators.required]),
  })

  nuovoAnnuncio!: Annuncio
  selectedFiles: File[] = [];

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
  }

  handleStep1Form(){
    this.nuovoAnnuncio.AgenteImmobiliareUsername = this.authService.user() as string;
    this.nuovoAnnuncio.categoria = this.step1Form.value.tipo as string;
    this.nuovoAnnuncio.prezzo = this.step1Form.value.prezzo as string;
    this.nuovoAnnuncio.descrizione = this.step1Form.value.descrizione as string;
    this.nuovoAnnuncio.nStanza = this.step1Form.value.numeroStanze as string;
    this.nuovoAnnuncio.dimensioni = this.step1Form.value.dimensioni as string;
    this.step = 2;
  }

  handleStep2Form(){
    this.nuovoAnnuncio.immagini = this.selectedFiles;
    this.nuovoAnnuncio.ascensore = (this.step2Form.get('servizi.ascensore') as FormControl).value as boolean;
    this.nuovoAnnuncio.altriServizi = this.setAltriServizi();
    this.nuovoAnnuncio.classeEnergetica = this.step2Form.value.classeEnergetica as string;
    this.nuovoAnnuncio.piano = this.step2Form.value.piano as string;
    this.step = 3;
  }

  setAltriServizi(): string { 
    let ris: string= "portineria:"+this.step2Form.get('servizi.portineria')?.value as string+"-"+
      "climatizzazione:"+this.step2Form.get('servizi.climatizzazione')?.value as string;
    return ris
  }

  backStep(){
    this.step--;
  }
}


