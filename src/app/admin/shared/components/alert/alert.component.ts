import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 3500;

  public text?: string;
  public type: string = 'success';

  alertSubscription?: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.alert$.subscribe({
      next: (alert) => {
        this.text = alert.text;
        this.type = alert.type;

        const timeout = setTimeout(() => {
          clearTimeout(timeout);
          this.text = '';
        }, this.delay)
      }
    })
  }

  ngOnDestroy(): void {
      if(this.alertSubscription) {
        this.alertSubscription.unsubscribe();
      }
  }

}
