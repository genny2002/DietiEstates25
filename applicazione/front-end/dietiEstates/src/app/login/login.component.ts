import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../_services/AuthService/auth-service.service';
import { BackendService } from '../_services/backend/backend.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  toastr = inject(ToastrService);
  router = inject(Router);
  backendService = inject(BackendService);
  authService = inject(AuthService);
  submitted = false;
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
  })

  handleLogin() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.toastr.error("Inserire dei dati corretti", "Errore: dati errati");
    } else {
      this.backendService.login({
        usr: this.loginForm.value.user as string,
        email: null, 
        pwd: this.loginForm.value.pass as string,
      }).subscribe({
        next: (token) => {
          this.authService.updateToken(token);
        },
        error: (err) => {
          this.toastr.error("Inserire username e password corretti.", "Errore: credenziali errate");
        },
        complete: () => {
          this.toastr.success(`Accesso effettuato correttamente`, `Benvenuto ${this.loginForm.value.user}!`);

          const role = this.authService.authState().role;
          
          switch (role) {
            case "gestoreAgenzia":
              this.router.navigateByUrl("/homePageGestore");
              break;
            case "agenteImmobiliare":
              this.router.navigateByUrl("/homePageAgenteImmobiliare");
              break;
            case "cliente":
              this.router.navigateByUrl("/homePageCliente");
              break;
            case "collaboratore":
              this.router.navigateByUrl("/homePageCollaboratore");
              break;
            default:
              console.error("Ruolo non riconosciuto:", role);
          }
        }
      })
    }
  }
}
