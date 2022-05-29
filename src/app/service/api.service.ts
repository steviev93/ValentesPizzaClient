import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { AuthResponse } from "../models/authresponse";
import { BROWSER_STORAGE } from "../../storage";
import { User } from "../models/user";
import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl:string = "https://localhost:44345/api/";
  private productUrl = `${this.baseUrl}products/`;
  private orderUrl = `${this.baseUrl}Orders/`;
  constructor(private http : HttpClient) { 
    
  }
  getProduct(): Promise<Product[]>{
    return this.http
      .get(this.productUrl)
      .toPromise()
      .then(response => response as Product[])
      .catch(this.handleError);
  }
  getProductGroups(){
    return this.http.get<any>(this.baseUrl + "ProductGroups")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  submitOrder(formData: Order) : Promise<Order> {
    return this.http
      .post(this.orderUrl, formData)
      .toPromise()
      .then(response => response as Order)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("login", user);
  }

  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall("register", user);
  }
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.baseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then((response) => response as AuthResponse)
      .catch(this.handleError);
  }
}