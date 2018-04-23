import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { OrderService } from './order.service';
// import { Participant, Payment } from '../org.greenstream.b2b.system';
// import { AccountHolder, AccountUser } from '../org.greenstream.participants';
// import { Payer, Payee } from '../org.greenstream.payment';
// import { SuppliersService } from './suppliers.service';
// import 'rxjs/add/operator/toPromise';
// import { AuthService } from '../auth/auth.service';
// import { UsersService } from '../users/users.service';
// import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('placeOrderForm') placeOrderForm: NgForm;

  public historyIncoming: Array<any> = [];
  public historyOutgoing: Array<any> = [];
  public suppliersList: Array<any> = [];
  private supplier = {
    affiliated: [],
    selected: -1
  };
  public order = {
    productType: null,
    productAmount: null,
    producer: null
  };
  // Dummy strain data
  public productTypes = [
    {
      id: 1,
      name: 'Purple Kush'
    },
    {
      id: 2,
      name: 'Blue Dream'
    },
    {
      id: 3,
      name: 'Cherry Pie'
    }
  ];

  constructor(private orderService: OrderService) {
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
              this.suppliersList.push(supplier_info.profile);
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

  public placeOrder(): void { }

}
