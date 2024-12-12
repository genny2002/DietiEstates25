import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';

interface FirstAccessWrapper {
  firstAccess: boolean;
}

@Component({
  selector: 'app-home-page-gestore',
  imports: [],
  templateUrl: './home-page-gestore.component.html',
  styleUrl: './home-page-gestore.component.scss'
})
export class HomePageGestoreComponent {
  authService = inject(AuthService);  //gestisce le informazioni della sessione
  backendService = inject(BackendService); //effettua le richieste HTTP
  showChangePassword = false;
  userfirstAccess: FirstAccessWrapper;

  ngOnInit() {  //inizializza il componente
    this.inituserMustChangePassword();

    if(this.userMustChangePassword){
      this.showChangePassword = true;
    }else{
      this.showChangePassword = false;
    }
  }

  inituserMustChangePassword(){
    this.backendService.getFirstAccess().subscribe({
      next: (data) => {
        this.todos = data;
      },
      error: (err) => {
        if(err.status === 401){
          this.toastr.error("Your access token appears to be invalid. Login again", "Token expired");
          this.router.navigateByUrl("/login");
        } else {
          this.toastr.error(err.message, err.statusText)
        }
      }
    });
  }



}
