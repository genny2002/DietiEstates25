import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageAgenteImmobiliareComponent } from './home-page-agente-immobiliare/home-page-agente-immobiliare.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CommonModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(HomePageAgenteImmobiliareComponent) childComponent!: HomePageAgenteImmobiliareComponent;

  title = 'DietiEstates'; //titolo del'applicazione

  handleButtonClick() {
    if (this.childComponent) {
      this.childComponent.getImmobili();  // Chiama il metodo del SecondComponent
    } else {
      console.log('SecondComponent non è ancora disponibile.');
    }
  }
}
