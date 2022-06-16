import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  formRegister!: FormGroup;
  submitted: boolean = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.formRegister.invalid) {
      return;
    }

    const user: User = {
      email: this.formRegister.value.email,
      password: this.formRegister.value.password,
      returnSecureToken: true
    }

    this.authService.signup(user).subscribe({
      next: () => {
        this.formRegister.reset();
        this.router.navigate(['/']);
        this.submitted = true;
      },
      complete: () => {
        this.submitted = false;
      }
    }
    )
  }

}
