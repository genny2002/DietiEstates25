import { Component, inject,  Renderer2, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../_services/backend/backend.service';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { ApiMeteoResponse } from '../_services/backend/meteo.type';
import { AnnuncioGet } from '../_services/backend/annuncio.type';
import { Disponibilita } from '../_services/backend/disponibilita.type';

@Component({
  selector: 'app-prenota',
  imports: [ReactiveFormsModule],
  templateUrl: './prenota.component.html',
  styleUrl: './prenota.component.scss',
})
export class PrenotaComponent {
  backendService = inject(BackendService);
  toastr = inject(ToastrService);
  route = inject(ActivatedRoute);
  authService = inject(AuthService);
  router = inject(Router);
  renderer = inject(Renderer2);
  elementRef = inject(ElementRef);

  weatherData?: ApiMeteoResponse;
  annuncioItem?: AnnuncioGet;
  fullDayList: number[] = []; 
  visibleDays: number[] = []; 
  startIndex: number = 0;

  numberClick: number = 0;
  dayToShow: number[]=[];

  disponibilita: Disponibilita[] = [];

  showRichiestaForm: boolean = false;
  orari: string[] = [];
  dateSelected: string = '';  

  submittedRichiestaForm = false;
  richiestaForm = new FormGroup({
    orario: new FormControl('', [Validators.required]),
    offerta: new FormControl(),
  })

  async ngOnInit() {
    await this.initAnnuncioItem();
    this.initDisponibilita();
    this.getCordinates();
  }

  initDisponibilita() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = `${year}-${month}-${day}`;

    if(this.annuncioItem?.AgenteImmobiliareUsername){
      this.backendService.getDisponibilita(this.annuncioItem?.AgenteImmobiliareUsername, todayString).subscribe({
        next: (data) => {
          this.disponibilita = data;
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
        }
      });
    }
  }

  async initAnnuncioItem(): Promise<void> {
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

  getCordinates()  {
    if(this.annuncioItem?.indirizzo) {
      this.backendService.getCoordinates(this.annuncioItem?.indirizzo).subscribe({
        next: (data) => {
          this.getMeteo(data[0].latitude, data[0].longitude)
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
        }
      });
    }
  }

  getMeteo(lat: number, lon: number) {
    this.backendService.getMeteo(lat, lon).subscribe({
      next: (data) => {
        this.weatherData = data;
        this.initAnnuncioToShow();
      },
      error: (err) => {
        if (err.status === 401) {
          this.toastr.error("Effettuare nuovamente il login", "Token non valido");
        }
      }
    });
  }

  getUrlIcon(day: number): string {
    switch (this.weatherData?.daily.weathercode[day]) {
      case 0:
      case 1:
        return "sun.png";

      case 2:
      case 3:
        return "cloud.png";

      case 45:
      case 48:
        return "fog.png";

      case 51:
      case 53:
      case 55:
      case 56:
      case 57:
      case 61:
      case 63:
        return "cloud-rain.png";

      case 65:
      case 66:
      case 67:
      case 80:
      case 81:
      case 82:
      case 95:
      case 96:
      case 99:
        return "bolt.png";

      case 71:
      case 73:
      case 75:
      case 77:
      case 85:
      case 86:
        return "cloud-snow.png";

      default:
        return "";
    }
  } 

  async initAnnuncioToShow(): Promise<void> {
    this.backendService.getAnnuncioToShow(this.route.snapshot.params["id"]).subscribe({
      next: (annuncio) => {
        this.annuncioItem = annuncio[0];
        this.fullDayList = this.weatherData?.daily?.time || [];
        this.updateVisibleDays();
      },
      error: (err) => {
        this.toastr.error(err.message, err.statusText);
      }
    });
  }

  updateVisibleDays() {
    this.visibleDays = this.fullDayList.slice(this.startIndex, this.startIndex + 7);
  }

  getDayClass(day: number | undefined): string {
    const disponibilita = this.disponibilita.find(d => d.data == day?.toString());
    if (disponibilita?.orariDisponibili.length == 0) {
      return 'flex-1 bg-verdeScuro p-4 text-white text-center opacity-60';
    }

    return 'flex-1 bg-verdeScuro hover:bg-arancione cursor-pointer p-4 text-white text-center';
  }

  selectDay(day: number) {
    this.showRichiestaForm=true;
    this.dateSelected=this.disponibilita[day].data;
    this.orari=this.disponibilita[day].orariDisponibili;

    const selectedDayElement = document.querySelector(`#d${day}`);
    const classesToRemove = ['flex-1','bg-verdeScuro','hover:bg-arancione','cursor-pointer','p-4','text-white','text-center'];
    const classesToAdd = ['flex-1','bg-arancione','cursor-pointer','p-4','text-white','text-center'];

    if (selectedDayElement) {
      const parent = selectedDayElement.parentNode;
  
      if(parent){ 
        let siblings = Array.from(parent.children);
        let otherSiblings = siblings.filter((el) => el !== selectedDayElement);

        otherSiblings.forEach((el) => {
          if (el) {
            classesToAdd.forEach((className) => {
              this.renderer.removeClass(el, className);
            });
            classesToRemove.forEach((className) => {
              this.renderer.addClass(el, className);
            });
          }
        });
      }
    }

    if (selectedDayElement) {
      classesToRemove.forEach((className) => {
        this.renderer.removeClass(selectedDayElement, className);
      });
      classesToAdd.forEach((className) => {
        this.renderer.addClass(selectedDayElement, className);
      });
    }
  }

  nextPage() {
    if (this.startIndex + 7 < this.fullDayList.length) {
      this.startIndex += 7;
      this.updateVisibleDays();
    }
  }

  prevPage() {
    if (this.startIndex - 7 >= 0) {
      this.startIndex -= 7;
      this.updateVisibleDays();
    }
  }

  async getAgentEmail(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.backendService.getAgentEmail(this.annuncioItem?.AgenteImmobiliareUsername).subscribe({
        next: (data) => {
          resolve(data);
        },
        error: (err) => {
          this.toastr.error(err.message, err.statusText);
          reject(err);
        }
      })  
    })
  }

  handleRichiestaForm(){
    this.submittedRichiestaForm = true;

    if (this.richiestaForm.invalid) {
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");
    } else {
      this.backendService.createRichiesta({
        offerta: this.richiestaForm.value.offerta as number,
        data: this.dateSelected +'T'+(this.richiestaForm.value.orario as string)+':00Z',
        ClienteUsername: this.authService.user(),
        AgenteImmobiliareUsername: this.annuncioItem?.AgenteImmobiliareUsername as string,
        AnnuncioIDimmobile: this.route.snapshot.params["id"],
      }).subscribe({
        error: (err) => {
          this.toastr.warning("L'email non è stata inviata all'agente", "Email non inviata");
        },
        complete: async () => {
          try{
            const emailReciver = await this.getAgentEmail();

            this.sendEmail(this.authService.user(), emailReciver, this.annuncioItem?.indirizzo, this.richiestaForm.value.orario as string, this.richiestaForm.value.offerta as string, this.dateSelected);
            this.richiestaForm.reset();
            this.submittedRichiestaForm = false;
          }catch(err){
            this.toastr.warning("L'email non è stata inviata all'agente", "Email non inviata");
          }  
        }
      })
    }
  }

  sendEmail(usernameSender: string | null, emailReciver: string, address: string | undefined, orario: string, offert: string, date: string){
    let message = `${usernameSender} ha richiesto un'appuntamento per il giorno ${date} alle ore ${orario}, per visitare l'immobile a ${address}.\n`

    if(offert){
      message = message + `Offerta proposta: ${offert}\n`
    }

    message = message + `Accedi alle notifiche del tuo account DietiEstates per visualizzare e rispondere a questa richiesta`

    this.backendService.inviaEmail({
      to: emailReciver,
      subject: "Nuova Richiesta",
      text: message
    }).subscribe({
      error: (err) => {
        this.toastr.error("L'email non è stata inviata al nuovo utente", "Email non inviata");
      },
      complete: () => {
        this.toastr.success(`E' stata inviata una mail all'agente immobiliare`, `Registrazione effettuata`);
        this.router.navigateByUrl("/homePageCliente");
      }
    })
  }
}