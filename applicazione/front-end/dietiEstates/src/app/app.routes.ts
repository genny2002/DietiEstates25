import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LogoutComponent } from './logout/logout.component';

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
      },






];
