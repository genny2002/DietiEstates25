import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BackendService } from '../_services/backend/backend.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  toastr = inject(ToastrService);
  router = inject(Router);
  restService = inject(BackendService);
  submitted = false;
  signupForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)])
      
  })

  handleSignup() {
    this.submitted = true;

    if (this.signupForm.invalid) {
      this.toastr.error("I dati che hai inserito non sono corretti", "Dati errati");
    } else {
      this.restService.signup({
        usr: this.signupForm.value.user as string,
        email: this.signupForm.value.email as string,
        pwd: this.signupForm.value.pass as string,
      }).subscribe({
        error: (err) => {
          this.toastr.error("L'username che hai inserito è già stato utilizzato da un altro utente", "Username in uso");
        },
        complete: () => {
          this.toastr.success(`Puoi effettuare il login con il tuo nuovo username`, `Sign up effettuato`);
          this.router.navigateByUrl("/login");
        }
      })
    }
  }
}