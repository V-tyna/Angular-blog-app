import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {
  public text: string;
  public type: string = 'success';
  private delay = 3500;
  private alertSubscription: Subscription;

  constructor(private alertService: AlertService) { }

  public ngOnInit(): void {
    this.alertSubscription = this.alertService.alert$.subscribe((alert) => {
      this.text = alert.text;
      this.type = alert.type;

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay);
    });
  }

  public ngOnDestroy(): void {
    this.alertSubscription?.unsubscribe();
  }
}
