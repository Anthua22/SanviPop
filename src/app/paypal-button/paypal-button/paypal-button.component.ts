import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { PaypalConfig, PAYPAL_CONFIG } from '../paypal-button.config';
import { PaypalLoadService } from '../services/paypal-load.service';

declare let paypal: any;

@Component({
  selector: 'sp-paypal-button',
  template: '',
  styleUrls: []
})
export class PaypalButtonComponent implements OnInit {

  @Input() amount!: number;
  @Input() idButton!:string;
  // true (payment completed), false (payment cancelled)
  @Output() paymentCompleted = new EventEmitter<boolean>();


  constructor(@Optional() @Inject(PAYPAL_CONFIG) private config: PaypalConfig,
    private paypalService: PaypalLoadService,
    private elementRef: ElementRef
  ) {

    if(!config){
      throw new Error('PaypalButtonComponent: Paypal configuration no provided. You must call forRoot');
    }
  }

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
