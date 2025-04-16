import { Component, inject, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { IntercativeMapComponent } from './intercative-map/intercative-map.component';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { Annuncio } from '../_services/backend/annuncio.type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nuovo-immobile',
  imports: [ReactiveFormsModule, RouterLink, IntercativeMapComponent],
  templateUrl: './nuovo-immobile.component.html',
  styleUrl: './nuovo-immobile.component.scss'
})
export class NuovoImmobileComponent {
  @Output() eventoRicevuto = new EventEmitter<void>();

  authService = inject(AuthService);
  router = inject(Router);
  toastr = inject(ToastrService);
  step: number = 1;

  submittedStep1 = false;
  step1Form = new FormGroup({
    tipo: new FormControl('', [Validators.required]),
    prezzo: new FormControl('', [Validators.required]),
    descrizione: new FormControl('', [Validators.required]),
    numeroStanze: new FormControl('', [Validators.required]),
    dimensioni: new FormControl('', [Validators.required]),
  })

  submittedStep2 = false;
  step2Form = new FormGroup({
    immagini: new FormControl('', [Validators.required]),
    servizi: new FormGroup({
      ascensore: new FormControl('', [Validators.required]),
      portineria: new FormControl('', [Validators.required]),
      climatizzazione: new FormControl('', [Validators.required]),
    }),
    classeEnergetica: new FormControl('', [Validators.required]),
    piano: new FormControl('', [Validators.required]),
  })

  nuovoAnnuncio: Annuncio | any = {};
  selectedFiles: File[] = [];

  onFilesSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files);
   
  }

  handleStep1Form(){
    this.submittedStep1 = true;

    if (this.step1Form.invalid) {
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");
    }else{
      this.nuovoAnnuncio.AgenteImmobiliareUsername = this.authService.user();
      this.nuovoAnnuncio.categoria = this.step1Form.value.tipo as string;
      this.nuovoAnnuncio.prezzo = this.step1Form.value.prezzo as string;
      this.nuovoAnnuncio.descrizione = this.step1Form.value.descrizione as string;
      this.nuovoAnnuncio.numeroStanze = this.step1Form.value.numeroStanze as string;
      this.nuovoAnnuncio.dimensioni = this.step1Form.value.dimensioni as string;
      this.step = 2;
    }

  }

  handleStep2Form(){
    this.nuovoAnnuncio.foto = this.selectedFiles;

    if((this.step2Form.get('servizi.ascensore') as FormControl).value as boolean){
      this.nuovoAnnuncio.ascensore = true;
    }else{
      this.nuovoAnnuncio.ascensore = false;
    }

    this.nuovoAnnuncio.altriServizi = this.setAltriServizi();
    this.nuovoAnnuncio.classeEnergetica = this.step2Form.value.classeEnergetica as string;
    this.nuovoAnnuncio.piano = this.step2Form.value.piano as string;
    this.step = 3;
  }

  setAltriServizi(): string { 
    let ris: string="portineria:"
    
    if((this.step2Form.get('servizi.portineria') as FormControl).value as boolean){
      ris+="true-climatizzazione:";
    }else{
      ris+="false-climatizzazione:";
    }

    if((this.step2Form.get('servizi.climatizzazione') as FormControl).value as boolean){
      ris+="true";
    }else{
      ris+="false";
    }

    return ris
  }

  backStep(){
    this.step--;
  }

  propagateEvent() { 
    this.eventoRicevuto.emit();
  }
}


