import { Component, inject, AfterViewInit, ViewChild, ElementRef, } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { AnnuncioGet } from '../_services/backend/annuncio.type';
import { BackendService } from '../_services/backend/backend.service';

interface Servizio {
  nome: string;
  valore: string;
  nomeFile: string;
}

@Component({
  selector: 'app-annuncio-detail',
  imports: [NgOptimizedImage],
  templateUrl: './annuncio-detail.component.html',
  styleUrl: './annuncio-detail.component.scss'
})
export class AnnuncioDetailComponent  {
  constructor(private route: ActivatedRoute) { }

  @ViewChild('carousel', { static: false }) carousel!: ElementRef<HTMLDivElement>;
  annuncioItem?: AnnuncioGet;
  editLink = "";  //link per modificare l'idea 'ideaItem'
  servizi: Servizio[] = []

  currentIndex = 0;
  slides!: NodeListOf<HTMLDivElement>;

  backendService = inject(BackendService);
  router = inject(Router);
  toastr = inject(ToastrService); //mostra le notifiche

  async ngOnInit() {  //inizializza il componente
    await this.initIdea();  //inizializza 'ideaItem'
    this.editLink = "/immobile/" + this.annuncioItem?.IDimmobile + "/prenota";  //inizializza 'editLink'

    const pairs = this.annuncioItem?.altriServizi.split('-');
    
    if(pairs){
      this.servizi = pairs.map(pair => {
        const [nome, valore] = pair.split(':');
      
        return { 
          nome, 
          valore, 
          nomeFile: `${nome}.png` 
        };
      });
    }
  }//fine ngOnInit

  async initIdea(): Promise<void> { //recupera le informazioni dell'idea 'ideaItem' e la inizializza
    return new Promise((resolve, reject) => {
      this.backendService.getAnnuncioToShow(this.route.snapshot.params["id"]).subscribe({ //recupera le informazioni di 'ideaItem'
        next: (annuncio) => {
          this.annuncioItem = annuncio[0]; //inizializza 'ideaItem' con i dati trovati
          console.log(this.annuncioItem);
          resolve();
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText); //mostra un messaggio di errore
          reject(err);
        }
      });
    })
  }//initIdea

  ngAfterViewInit() {
    const slides = this.carousel.nativeElement.querySelectorAll('div');
    console.log(slides); // Ora hai accesso a tutti i <div> figli
  }
  
  moveSlide(direction: number) {
    console.log(direction);
    this.currentIndex = (this.currentIndex + direction + this.slides.length) % this.slides.length;
  
    setTimeout(() => {
      const carousel = document.getElementById("carousel");
      if (carousel) {
        carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      }
    }, 0); // Permette al DOM di completare il rendering
  }
}
