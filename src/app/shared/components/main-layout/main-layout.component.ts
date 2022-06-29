import { AfterContentChecked, Component } from '@angular/core';
import { AuthService } from 'src/app/admin/shared/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements AfterContentChecked {
  public isAuthenticated: boolean;

  constructor(private authService: AuthService) { }

  public ngAfterContentChecked(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }
}
