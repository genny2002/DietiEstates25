import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../_services/AuthService/auth-service.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isOpen = false; //flag di apertura della navbar mobile
  isDropdownOpen = false; //flag di apertura del dropdown
  authService = inject(AuthService);  //gestisce le informazioni della sessione

  toggle() {  //gestisce il toggle della navbar su schermi piccoli
    this.isOpen = !this.isOpen;
  }//fine toggle

  handleNavigationClick() {  //chiude la navbar aperta quando un utente clicca su un link
    this.isOpen = false;
  }//fine handleNavigationClick

  toggleDropdown() { //aggiorna il flag di apertura del dropdown
    this.isDropdownOpen = !this.isDropdownOpen;
  }//fine toggleDropdown

  setRouter(): string {
    if(! this.authService.isUserAuthenticated()){
      return ""
    }else{
      const role = this.authService.authState().role;
          
      switch (role) {
        case "gestoreAgenzia":
          return "/homePageGestore";

        case "agenteImmobiliare":
          return "/homePageAgenteImmobiliare";
        case "cliente":
          return "/homePageCliente";
        case "collaboratore":
          return "/homePageCollaboratore";
        default:
          return ""
      }
    }

  }
}
