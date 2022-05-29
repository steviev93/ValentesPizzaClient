import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductGroup } from '../models/productGroup';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  public productList: any;
  public productGroupList !: ProductGroup[];
  public filterCategory: any;
  public totalItem: number = 0;
  searchKey: string = "";
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
      })
    this.api.getProduct()
      .then(res => {
        this.productList = res;
      });
    this.api.getProductGroups()
      .subscribe(res => {
        this.productGroupList = res;
        // this.filterCategory = res;
        this.filterCat('')
      });
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  filterCat(category: string) {
    this.filterCategory = this.productList
      .filter((a: any) => {
        let pgName:string = this.productGroupList.filter(x => x.id == a.productGroupId)[0].name;
        if ( pgName== category || category == '') {
          return a;
        }
      })
  }


}