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
  isOpen = false;
  isDropdownOpen = false;
  authService = inject(AuthService);

  toggle() {
    this.isOpen = !this.isOpen;
  }

  handleNavigationClick() {
    this.isOpen = false;
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

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
