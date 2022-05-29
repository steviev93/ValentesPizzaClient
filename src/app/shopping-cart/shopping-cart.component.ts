import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public products : any = [];
  public subTotal !: number;
  public grandTotal !: number;
  public tax !: number;
  constructor(private cartService : CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe((res: any)=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      this.subTotal = this.cartService.getSubTotal();
      this.tax = this.grandTotal - this.subTotal;
    })
  }
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }
  

}