import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor() { }

  ngOnInit() {
  }

  public placeOrder() { }

}
