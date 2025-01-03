import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import {IntercativeMapComponent} from './intercative-map/intercative-map.component';

@Component({
  selector: 'app-nuovo-immobile',
  imports: [ReactiveFormsModule, RouterLink, IntercativeMapComponent],
  templateUrl: './nuovo-immobile.component.html',
  styleUrl: './nuovo-immobile.component.scss'
})
export class NuovoImmobileComponent {
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
    altriServizi: new FormControl('', [Validators.required]),
    classeEnergetica: new FormControl('', [Validators.required]),
    piano: new FormControl('', [Validators.required]),
  })

  submittedStep3 = false;  //flag dello stato di invio del form
  step3Form = new FormGroup({ //form per il login
    citta: new FormControl('', [Validators.required]), //campo di input dell'username
    comune: new FormControl('', [Validators.required]),
    viaECivico: new FormControl('', [Validators.required]),
  })

  handleStep1Form(){
    this.step = 2;
  }

  handleStep2Form(){
    this.step = 3;
  }

  handleStep3Form(){
    //this.step = 3;
    this.router.navigateByUrl("/homePageAgenteImmobiliare");
  }

  backStep(){
    this.step--;
  }
}


