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
  toastr = inject(ToastrService);
  authService = inject(AuthService);

  async ngOnInit() {
    await this.initAnnuncio();
    this.editLink = "/immobile/" + this.annuncioItem?.IDimmobile + "/prenota";

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
  }

  async initAnnuncio(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.backendService.getAnnuncioToShow(this.route.snapshot.params["id"]).subscribe({
        next: (annuncio) => {
          this.annuncioItem = annuncio[0];
          resolve();
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
          reject(err);
        }
      });
    })
  }
  
  moveSlide(direction: number) {
    if(this.annuncioItem){
      this.currentIndex = (this.currentIndex + direction + this.annuncioItem?.immagini.length) % this.annuncioItem?.immagini.length;
    }
    
    setTimeout(() => {
      const carousel = document.getElementById("carousel");
      if (carousel) {
        carousel.style.transform = `translateX(-${this.currentIndex * 100}%)`;
      }
    }, 0);
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
