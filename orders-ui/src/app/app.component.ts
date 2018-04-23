import { Component } from '@angular/core';
// import { AuthService } from './auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { UsersService } from './users/users.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {
    this.router.navigate(['/orders']);
  }
}
