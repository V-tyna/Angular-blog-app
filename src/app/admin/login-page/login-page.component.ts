import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form!: FormGroup;
  submitted: boolean = false;
  message: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, login again.';
      } else if (params['authFailed']) {
        this.message = 'Session expired. Please, login again.';
      }
    })

    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const user: User = {
      email: this.form.value.email,
      password: this.form.value.password,
      returnSecureToken: true
    };

    this.authService.login(user).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/']);
        this.submitted = true;
      },
      complete: () => {
        this.submitted = false;
      }
    })

  }

}
