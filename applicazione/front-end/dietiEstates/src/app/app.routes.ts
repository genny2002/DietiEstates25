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
    },
];
