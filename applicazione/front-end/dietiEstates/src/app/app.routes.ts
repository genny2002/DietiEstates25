import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';

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
    },];
