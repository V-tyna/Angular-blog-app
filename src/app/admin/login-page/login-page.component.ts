import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { User } from '../../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public formLogin: FormGroup;
  public submitted: boolean = false;
  public message: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Please, login again.';
      } else if (params['authFailed']) {
        this.message = 'Session expired. Please, login again.';
      }
    });

    this.formLogin = new FormGroup({
      email: new FormControl(null, [
        Validators.email,
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  public submit() {
    if (this.formLogin.invalid) {
      return;
    }

    const user: User = {
      email: this.formLogin.value.email,
      password: this.formLogin.value.password,
      returnSecureToken: true
    };

    this.authService.login(user).subscribe({
      next: () => {
        this.formLogin.reset();
        this.router.navigate(['/']);
        this.submitted = true;
      },
      complete: () => {
        this.submitted = false;
      }
    });

  }

}
