import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
// import { Participant } from '../org.greenstream.b2b.system';
// import { AccountHolder, AccountUser } from '../org.greenstream.participants';
import 'rxjs/Rx';

@Injectable()
export class OrderService {
    constructor(private dataService: DataService<any>, private http: HttpClient) {
        // ...
    }

    public getProducers(): Promise<any> {
        return this.dataService.getAll('/suppliers/list').toPromise();
    }

    public getSupplierInfo(username: string): Promise<any> {
        return this.dataService.getAll(`/suppliers/${username}`).toPromise();
    }
}
