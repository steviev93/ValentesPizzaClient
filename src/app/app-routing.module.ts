import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ItemListComponent } from './item-list/item-list.component';
import { LandingComponent } from './landing/landing.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {path:'', component: LandingComponent},
  {path:'products', component: ItemListComponent},
  {path:'cart', component: ShoppingCartComponent},
  {path:'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }