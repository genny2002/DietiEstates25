import { Component, inject, AfterViewInit, ViewChild, ElementRef, } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common'
import { ToastrService } from 'ngx-toastr';
import { AnnuncioGet, Immagine } from '../_services/backend/annuncio.type';
import { BackendService } from '../_services/backend/backend.service';
import { AuthService } from '../_services/AuthService/auth-service.service';

interface Servizio {
  nome: string;
  valore: string;
  nomeFile: string;
}

@Component({
  selector: 'app-annuncio-detail',
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './annuncio-detail.component.html',
  styleUrl: './annuncio-detail.component.scss'
})
export class AnnuncioDetailComponent  {
  constructor(private route: ActivatedRoute) { }

  @ViewChild('carousel', { static: false }) carousel!: ElementRef<HTMLDivElement>;
  annuncioItem?: AnnuncioGet;
  editLink = "";  //link per modificare l'idea 'ideaItem'
  backLink="/ricerca";  //link per tornare alla pagina di ricerca
  servizi: Servizio[] = []

  currentIndex = 0;
  slides!: NodeListOf<HTMLDivElement>;
  selectedImageIndex = -1;
  immagineDaMostrare : Immagine = {url: "", nome: ""}

  backendService = inject(BackendService);
  router = inject(Router);
  toastr = inject(ToastrService); //mostra le notifiche
  authService = inject(AuthService);

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
  }//initIdeas
  
  moveSlide(direction: number) {
    if(this.annuncioItem){
      this.currentIndex = (this.currentIndex + direction + this.annuncioItem?.immagini.length) % this.annuncioItem?.immagini.length;
    }
    
    setTimeout(() => {
      const carousel = document.getElementById("carousel");
      if (carousel) {
        carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      }
    }, 0); // Permette al DOM di completare il rendering
  }

  showImmage(index: number): void {
    this.selectedImageIndex = index;

    if(this.annuncioItem?.immagini[index] != undefined){
      this.immagineDaMostrare = this.annuncioItem?.immagini[index];
    }
  }

  closeModal(): void {
    this.selectedImageIndex = -1;
  }

  changeImage(direction: number): void {
    if(this.annuncioItem){
      this.selectedImageIndex = (this.selectedImageIndex + direction + this.annuncioItem?.immagini.length) % this.annuncioItem?.immagini.length;
      this.immagineDaMostrare = this.annuncioItem?.immagini[this.selectedImageIndex];
    }
  }
}
