import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from './order.service';
import { NotificationService } from '../notification.service';
// import { Participant, Payment } from '../org.greenstream.b2b.system';
// import { AccountHolder, AccountUser } from '../org.greenstream.participants';
// import { Payer, Payee } from '../org.greenstream.payment';
// import { SuppliersService } from './suppliers.service';
// import 'rxjs/add/operator/toPromise';
// import { AuthService } from '../auth/auth.service';
// import { UsersService } from '../users/users.service';
// import { NotificationService } from '../notification.service';

declare var jQuery: any;

interface Supplier {
  profile: any;
  is_verified: boolean;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('placeOrderForm') placeOrderForm: NgForm;
  @ViewChild('producer') producerSelection: FormControl;

  public historyIncoming: Array<any> = [];
  public historyOutgoing: Array<any> = [];
  public suppliersList: Array<Supplier> = [];
  private supplier = {
    affiliated: [],
    selected: -1
  };

  public processingMessage = null;

  public order = {
    productType: null,
    productAmount: null,
    // XXX (chris): this and total need to befixed to change rogrammatically:
    productPrice: "4",
    producer: null,
    total: "400"
  };
  // Dummy strain data
  public productTypes = [
    {
      id: 1,
      name: 'Purple Kush',
      price_per_unit: 2
    },
    {
      id: 2,
      name: 'Blue Dream',
      price_per_unit: 3
    },
    {
      id: 3,
      name: 'Cherry Pie',
      price_per_unit: 4
    }
  ];

  constructor(
    private orderService: OrderService,
    private notificationService: NotificationService
  ) {
    this.getProducers();
  }

  ngOnInit() {
  }

  public getProducers(): void {
    this.orderService.getProducers()
      .then((supplier_list) => {
        console.log('get producers response =>', supplier_list);
        supplier_list.forEach((supplier) => {
          this.orderService.getSupplierInfo(supplier.username)
            .then((supplier_info) => {
              console.log('supplier info =>', supplier_info);
              // TODO: add conditional to check if suppliers = true
              this.suppliersList.push(
                {
                  profile: supplier_info.profile,
                  is_verified: true
                }
              );
            })
            .catch((error) => {
              console.log('Error getting supplier info:', error);
            });
        });
      })
      .catch((error) => {
        console.log('Error getting suppliers list:', error);
      });
  }

  public placeOrder(): void {
    const _self = this;

    this.processingMessage = "Verifying producer...";
    console.log('order =>', this.order);
    jQuery('#producer_verify_modal').modal('show');

    setTimeout(function() {
      _self.processingMessage = "Transferring funds...";
      _self.orderService.transferTokens(_self.order.total, _self.order.producer)
        .then((response) => {
          console.log('transfer funds response =>', response);
          jQuery('#producer_verify_modal').modal('hide');
          _self.notificationService.notify('success', 'Success! The producer was verified and your order has been placed.', false);
          _self.placeOrderForm.resetForm();
        })
        .catch((error) => {
          console.log('Error transferring funds:', error);
          jQuery('#producer_verify_modal').modal('hide');
          _self.notificationService.notify('danger', `Uh oh. There was a problem transferring funds: ${error.messsage}`, false);
        });
    }, 3000);

    // TODO: replace this with promise/observable from api call
    // setTimeout(function() {
    //   jQuery('#producer_verify_modal').modal('hide');
    //   _self.notificationService.notify('success', 'Success! The producer was verified and your order has been placed.', false);
    // }, 5000);
  }

}
