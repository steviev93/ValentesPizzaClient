import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { BROWSER_STORAGE } from '../../storage';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
  ) {
    try {
      let list= storage.getItem('item-list') as string;
      if (list != null) {
        this.cartItemList=this.cartItemList.concat(JSON.parse(list) as any[]);
        this.productList.next(this.cartItemList)
  
      }
    } catch (error) {
      
    }
   }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    this.storage.setItem('item-list', JSON.stringify(this.cartItemList));
    console.log(this.cartItemList)
  }
  getSubTotal() : number {
    let subTotal = 0;
    this.cartItemList.map((a:any)=>{
      subTotal += a.price;
    })
    return subTotal;
  }
  getTotalPrice() : number{
    let subTotal = this.getSubTotal();
    let salesTaxRate = 1.06;
    return subTotal*salesTaxRate;
  }
  removeCartItem(product: any){
    let dirty = false;
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id && dirty == false){
        this.cartItemList.splice(index,1);
        this.productList.next(this.cartItemList);
        this.storage.setItem('item-list', JSON.stringify(this.cartItemList));
        dirty = true;
        return;
      }
    })
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
    this.storage.removeItem('item-list');

  }
  checkout(order: Order) {
    
  }
}

