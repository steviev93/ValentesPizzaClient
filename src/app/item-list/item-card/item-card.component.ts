import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent implements OnInit {
  @Input('item') item: any;
  constructor(
    private cartService : CartService) { }

  ngOnInit(): void {
  }
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }
}
