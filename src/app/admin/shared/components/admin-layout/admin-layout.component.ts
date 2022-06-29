import { AfterContentChecked, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements AfterContentChecked {
  public isAuthenticated: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  public ngAfterContentChecked(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  public logout(e: Event) {
    e.preventDefault();
    this.authService.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
