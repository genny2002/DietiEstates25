import { Component, inject } from '@angular/core';
import { AuthService } from '../_services/AuthService/auth-service.service';

@Component({
  selector: 'app-home-page-gestore',
  imports: [],
  templateUrl: './home-page-gestore.component.html',
  styleUrl: './home-page-gestore.component.scss'
})
export class HomePageGestoreComponent {
  authService = inject(AuthService);  //gestisce le informazioni della sessione
}
