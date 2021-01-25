import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { PaypalConfig, PAYPAL_CONFIG } from '../paypal-button.config';
import { PaypalLoadService } from '../services/paypal-load.service';

declare var paypal: any;

@Component({
  selector: 'sp-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.css']
})
export class PaypalButtonComponent implements OnInit {

  @Input() amount!: number;
  // true (payment completed), false (payment cancelled)
  @Output() paymentCompleted = new EventEmitter<boolean>();


  constructor(@Inject(PAYPAL_CONFIG) private config: PaypalConfig,
    private paypalService: PaypalLoadService,
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {

    this.paypalService.loadPaypal().subscribe(
      () => this.render()
    );

  }

  private render(): void {
    paypal.Button.render(
      {
        env: this.config.environment,
        client: {
          sandbox: this.config.sandbox,
          production: this.config.production
        },
        payment: (data: any, actions: any) => {
          // Payment details
          return actions.payment.create({
            transactions: [
              {
                amount: {
                  total: this.amount,
                  currency: 'EUR'
                }
              }
            ]
          });
        },
        commit: true,
        onAuthorize: (data: any, actions: any) => {

          return actions.payment.execute()
            .then(() => {
              this.paymentCompleted.emit(true);
            })
            .catch(() => this.paymentCompleted.emit(false));
        },
        onCancel: (data: any) => {

          this.paymentCompleted.emit(false);
        }
      },
      '#' + this.elementRef.nativeElement.id
    );
  }

}
