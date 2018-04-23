import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { LoadingModule } from 'ngx-loading';

// Configurations
// import { Configuration } from './configuration';

// Services
// import { DataService } from './data.service';
// import { AuthService } from './auth/auth.service';
// import { UsersService } from './users/users.service';
// import { AccountService } from './account/account.service';
// import { SuppliersService } from './payments/suppliers.service';

// Components
import { AppComponent } from './app.component';
// import { HomeComponent } from './home/home.component';
// import { AuthComponent } from './auth/auth.component';
// import { LoginComponent } from './login/login.component';
// import { AccountComponent } from './account/account.component';
import { OrdersComponent } from './orders/orders.component';

// Directives
// import { CardNumberValidatorDirective } from './shared/card-num-validator.directive';
// import { CardCvvValidatorDirective } from './shared/card-cvv-validator.directive';
// import { CardMonthValidatorDirective } from './shared/card-month-validator.directive';
// import { CardYearValidatorDirective } from './shared/card-year-validator.directive';
// import { PostalCodeValidatorDirective } from './shared/postalcode-validator.directive';
// import { EmailAddressValidatorDirective } from './shared/email-form-validator.directive';
// import { UserNameValidatorDirective } from './shared/username-form-validator.directive';
// import { PasswordConfirmValidatorDirective } from './shared/pass-confirm-validator.directive';
// import { NotificationsComponent } from './notifications/notifications.component';
// import { NotificationService } from './notification.service';


@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent
    // HomeComponent,
    // AuthComponent,
    // LoginComponent,
    // AccountComponent,
    // PaymentsComponent,
    // CardNumberValidatorDirective,
    // CardCvvValidatorDirective,
    // CardMonthValidatorDirective,
    // CardYearValidatorDirective,
    // PostalCodeValidatorDirective,
    // EmailAddressValidatorDirective,
    // UserNameValidatorDirective,
    // PasswordConfirmValidatorDirective,
    // NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    LoadingModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthComponent,
    //   multi: true
    // },
    // Configuration,
    // DataService,
    // AuthService,
    // AccountService,
    // UsersService,
    // SuppliersService,
    // NotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
