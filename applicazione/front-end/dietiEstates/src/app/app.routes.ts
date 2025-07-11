import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LogoutComponent } from './logout/logout.component';
import { HomePageAgenteImmobiliareComponent } from './home-page-agente-immobiliare/home-page-agente-immobiliare.component';
import { HomePageClienteComponent } from './home-page-cliente/home-page-cliente.component';
import { HomePageGestoreComponent } from './home-page-gestore/home-page-gestore.component';
import { HomePageCollaboratoreComponent } from './home-page-collaboratore/home-page-collaboratore.component';
import { RegistraAgenziaComponent } from './registra-agenzia/registra-agenzia.component';
import { NuovoImmobileComponent } from './nuovo-immobile/nuovo-immobile.component';
import { NotificheComponent } from './notifiche-page/notifiche-page.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { AnnuncioDetailComponent } from './annuncio-detail/annuncio-detail.component';
import { PrenotaComponent } from './prenota/prenota.component';

export const routes: Routes = [ 
    {
        path: "signup",
        component: SignupComponent,
        title: "Sign up | DietiEstates"
    }, {
        path: "login",
        component: LoginComponent,
        title: "Login | DietiEstates"
    },{
        path: "",
        component: HomepageComponent,
        pathMatch: 'full'
    },{
        path: "logout",
        component: LogoutComponent,
        title: "Log out "
    },{
        path: "registra-agenzia",
        component: RegistraAgenziaComponent,
        title: "Nuova Agenzia | DietiEstates"
    },{
        path: "homePageAgenteImmobiliare",
        component: HomePageAgenteImmobiliareComponent,
        title: "Home Page | DietiEstates"
    },{
        path: "homePageCliente",
        component: HomePageClienteComponent,
        title: "Home Page | DietiEstates"
    },{
        path: "homePageGestore",
        component: HomePageGestoreComponent,
        title: "Home Page | DietiEstates"
    },{
        path: "homePageCollaboratore",
        component: HomePageCollaboratoreComponent,
        title: "Home Page | DietiEstates"
    },{
        path: "nuovoImmobile",
        component: NuovoImmobileComponent,
        title: "Nuovo Immobile | DietiEstates"
    },{
        path: "notifiche",
        component: NotificheComponent,
        title: "Notifiche | DietiEstates"
    },{
        path: "ricerca",
        component: RicercaComponent,
        title: "Ricerca | DietiEstates"
    }, {
        path: "immobile/:id",
        component: AnnuncioDetailComponent,
        title: "Annuncio Detail | DietiEstates",
    }, {
        path: "immobile/:id/prenota",
        component: PrenotaComponent,
        title: "Prenota | DietiEstates",
    }
];
