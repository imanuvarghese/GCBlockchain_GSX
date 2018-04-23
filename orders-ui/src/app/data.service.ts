import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { HttpClient, HttpInterceptor, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Configuration } from './configuration';

// Can be injected into a constructor
@Injectable()
export class DataService<Type> {
    private resolveSuffix: string = '?resolve=true';
    private actionUrl: string;
    private headers: Headers;

    // Test user data with hardcoded auth token
    private testUser = {
        username: null,
        email: null,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZGRhY2UwZDA0ZWRiZDMyYTEzMjQ4YiIsInVzZXJuYW1lIjoic2FtbWFjIiwiZXhwIjoxNTI0NTY4NDQxLCJpYXQiOjE1MjQ0ODIwNDF9.VX_rJD5pGrLGC0R53iQ7fkgJdictiC25hXcZd5wSEes'
    };

    // Constructor
    constructor(private http: HttpClient, private httpLegacy: Http, private _configuration: Configuration) {
        this.actionUrl = _configuration.ServerWithApiUrl;
    };

    /**
     * ABSTRACT HTTP
     */

    /**
     * Abstract POST request
     * XXX / TODO: Fix this legacy POST method to use HttpClient
     * @param ns {String} 
     * @param params {Object}
     */
    public postData(ns: string, params: object): Observable<any> {
        console.log('HTTP POST', this.actionUrl + ns);

        var req_body = new HttpParams();
        // Build req. body
        for (var key in params) {
            // Skip iteration if the property is from prototype
            if (params.hasOwnProperty(key)) {
                // Else set param
                req_body.set(String(key), params[key]);
            }
        }
        // Instance of HTTP header
        return this.http.post(this.actionUrl + ns, params)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    /**
     * Request an API resource of a given type as defined by its namespace
     * @param ns {String} - A URI namespace that will be attached as a URI to the base API endpoint
     * @method HttpClient GET
     */
    public getAll(ns: string): Observable<any> {
        console.log('GetAll ' + ns + ' to ' + this.actionUrl + ns);

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${this.testUser.token}`
            })
        };

        return this.http.get(`${this.actionUrl}${ns}`, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    /**
     * Request an API resource by its unique identifier
     * @param ns {String} - A URI namespace that will be attached as a URI to the base API endpoint
     * @param id {Mixed} - A string or integer unique identifier of the requested resource
     * @method HttpClient GET
     */
    public getSingle(ns: string, id: string): Observable<any> {
        console.log('GetSingle ' + ns + ' to ' + this.actionUrl + ns + '/' + id);

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.get(this.actionUrl + ns + '/' + id + this.resolveSuffix, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    // ...
    public add(ns: string, asset: Type): Observable<any> {
        console.log('Entered DataService add');
        console.log('Add ' + ns);
        console.log('asset', asset);

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.post(this.actionUrl + ns, asset, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    /**
     * Update an existing API instance with a new data set
     * @param ns {String} - A URI namespace that will be attached as a URI to the base API endpoint
     * @param id {Mixed} - A string or integer unique identifier of the requested resource
     * @param itemToUpdate {Mixed} - An instance of the updated item to synchronize in the API
     * @method HttpClient PUT
     */
    public update(ns: string, id: string, itemToUpdate: Type): Observable<any> {
        console.log('Update ' + ns);
        console.log('what is the id?', id);
        console.log('what is the updated item?', itemToUpdate);
        console.log('what is the updated item?', JSON.stringify(itemToUpdate));

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.put(`${this.actionUrl}${ns}/${id}`, itemToUpdate, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    /**
     * Deletes a target resource from the system
     * @param ns {String} - A URI namespace that will be attached as a URI to the base API endpoint
     * @param id {Mixed} - A string or integer unique identifier of the requested resource
     * @method HttpClient DELETE
     */
    public delete(ns: string, id: string): Observable<any> {
        console.log('Delete ' + ns);

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            })
        };

        return this.http.delete(this.actionUrl + ns + '/' + id, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    /**
     * HTTP POST
     */

    /**
     * Authenticate a user (login form)
     * @param ns {String} 
     * @param params {Object}
     */
    public authenticate(ns: string, params: object): Observable<any> {
        console.log('New authentication request', this.actionUrl + ns);

        return this.httpLegacy.post(this.actionUrl + ns, params)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Fund account using a credit card saved to an account profile
     * @param amount {String} - The amount of funds in CAD to add to the user's account / charge to the card
     * @param cardId {String} - The ID of the saved card. Example ID: "c132b482-1da3-4241-ae0f-bc4ed817b3c3"
     */
    public addFundsUsingSavedCard(
        amount: string,
        cardId: string
    ): Observable<any> {
        console.log('addFunds using saved card', this.actionUrl + 'payments/funds');

        let params = new HttpParams()
            .set('amount', amount)
            .set('cardId', cardId);

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };


        console.log('add funds request (saved card) =>', params);

        return this.http.post(this.actionUrl + 'payments/funds', params, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    /**
     * Add funds to user account using an unsaved card.
     * @param amount {String} - The amount of funds in CAD to add to the user's account / charge to the card
     * @param cardHolder {String} - The first and last name of the card owner as printed on the credit card
     * @param cardNumber {Integer} - The credit card number as printed on the credit card
     * @param cvv {String} - Card security number as printed on the rear of card
     * @param expiryMonth {String} - Month of credit card expiry date in the format MM, forced as string for months beginning with 0 (i.e. 01)
     * @param expiryYear {String} - Year of credit card expirty date in the format YYYY
     * @param province {String} - 2 character Candian province abbreviation, must match card
     * @param postalCode {String} - Postal code matching card billing address
     * @param street {String} - Street address matching card billing address
     * @param city {String} - City matching card billing address
     */
    public addFunds(
        amount: string,
        cardHolder: string,
        cardNumber: string,
        cvv: string,
        expiryMonth: string,
        expiryYear: string,
        province: string,
        postalCode: string,
        street: string,
        city: string
    ): Observable<any> {
        console.log('addFunds ', this.actionUrl + 'payments/payment');

        let params = new HttpParams()
            .set('amount', amount)
            .set('cardHolder', cardHolder)
            .set('cardNumber', cardNumber)
            .set('cvv', cvv)
            .set('expiryMonth', expiryMonth)
            .set('expiryYear', expiryYear)
            .set('province', province)
            .set('postalCode', postalCode)
            .set('street', street)
            .set('city', city);

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };


        console.log('add funds request =>', params);

        return this.http.post(this.actionUrl + 'payments/payment', params, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    public transferFunds (
        amount: string,
        username: string
    ): Observable<any> {
        console.log('transferFunds ', this.actionUrl + 'token/transfer');

        let params = {
            'amount': amount,
            'payee': username
        };

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${this.testUser.token}`
            })
        };

        console.log('transfer funds request =>', params);

        return this.http.post(this.actionUrl + 'token/transfer', params, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);
    }

    /**
     * Save a credit card to the target user's account profile
     * @param cardHolder {String} - The first and last name of the card owner as printed on the credit card
     * @param cardNumber {String} - The credit card number as printed on the credit card
     * @param cardType {String} - The type of credit card (manufacturer). Examples: VISA = "VI", MASTERCARD = "MC"
     * @param cvv {String} - Card security number as printed on the rear of card
     * @param expiryMonth {String} - Month of credit card expiry date in the format MM, forced as string for months beginning with 0 (i.e. 01)
     * @param expiryYear {Integer} - Year of credit card expirty date in the format YYYY
     * @param province {String} - 2 character Candian province abbreviation, must match card
     * @param postalCode {String} - Postal code matching card billing address
     * @param billingAddress {String} - Street address matching card billing address
     * @param city {String} - City matching card billing address
     */
    public saveCard(
        cardHolder,
        cardNumber,
        cardType,
        cvv,
        expiryMonth,
        expiryYear,
        province,
        postalCode,
        street,
        city
    ): Observable<any> {

        console.log('Save card ', this.actionUrl + 'payments/cards');

        let params = new HttpParams()
            .set('cardHolder', cardHolder)
            .set('cardNumber', cardNumber)
            .set('type', cardType)
            .set('cvv', cvv)
            .set('expiryMonth', expiryMonth)
            .set('expiryYear', expiryYear)
            .set('province', province)
            .set('postalCode', postalCode)
            .set('street', street)
            .set('city', city);

        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            })
        };


        console.log('add funds request =>', params);

        return this.http.post(this.actionUrl + 'payments/cards', params, httpOptions)
            .map(data => { return data; })
            .catch(this.handleError);

    }

    /**
     * HANDLERS
     */

    /**
     * Error handler
     * @param error {Mixed} - A pass through error message from the HTTP endpoint, or a JS failure message from try / catch
     */
    private handleError(error: any): Observable<string> {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        var errMsg;

        if (error.hasOwnProperty('error')) {
            if (error.error.hasOwnProperty('errors')) {
                errMsg = error.error.errors;
            } else {
                errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
            }
        } else {
            errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server Error';
        }
        console.log(error);
        return Observable.throw(errMsg);
    }

    /**
     * Deprecated data extractor. Only used in Http module calls. Takes an Http result and returns it as JSON
     * @param res {Object} - A response object cast to JSON
     * @see Response from '@angular/http'
     */
    private extractData(res: Response): any {
        return res.json();
    }
}
