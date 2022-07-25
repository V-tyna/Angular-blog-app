import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';

import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html'
})
export class SignupPageComponent implements OnInit {
  public formRegister!: FormGroup;
  public submitted: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  public submit(): void {
    if (this.formRegister.invalid) {
      return;
    }

    const {email, password} = this.formRegister.value;

    const user: User = {
      email,
      password,
      returnSecureToken: true
    };

    this.authService.signup(user).subscribe({
      next: () => {
        this.formRegister.reset();
        this.router.navigate(['/']);
        this.submitted = true;
      },
      complete: () => {
        this.submitted = false;
      }
    });
  }
}
