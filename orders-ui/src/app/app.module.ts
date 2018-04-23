import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';

// Configurations
import { Configuration } from './configuration';

// Services
import { DataService } from './data.service';
import { OrderService } from './orders/order.service';
import { NotificationService } from './notification.service';

// Components
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';

// Directives
import { InputValidatorDirective } from './shared/input-validator.directive';
import { NotificationsComponent } from './notifications/notifications.component';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    NotificationsComponent,
    InputValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    LoadingModule,
  ],
  providers: [
    Configuration,
    DataService,
    OrderService,
    NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
