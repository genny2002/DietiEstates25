import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-page-gestore',
  imports: [],
  templateUrl: './home-page-gestore.component.html',
  styleUrl: './home-page-gestore.component.scss'
})
export class HomePageGestoreComponent {
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  backendService = inject(BackendService); //effettua le richieste HTTP
  toastr = inject(ToastrService); //mostra le notifiche
  showChangePassword = false;
  userfirstAccess: boolean = false;

  ngOnInit() {  //inizializza il componente
    this.getUserFirstAccess();

    if(this.userfirstAccess){
      this.showChangePassword = true;
    }else{
      this.showChangePassword = false;
    }
  }

  getUserFirstAccess(){
    this.backendService.getFirstAccess(this.authService.getUser()).subscribe({
      next: (data) => {
        this.userfirstAccess = data;
      },
      error: (err) => {
        this.toastr.error(err.message, err.statusText);
      }
    });
  }
}
