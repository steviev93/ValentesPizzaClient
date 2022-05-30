import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from "@angular/forms";
import { Router } from "@angular/router";
import { Order } from '../models/order';
import { ApiService } from '../service/api.service';
import { CartService } from '../service/cart.service';
import {States} from '../models/states';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  submitted = false;
  selected = '';
  pickUp = false;
  states = States;
  delivery = true;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cartService: CartService,
    private apiService: ApiService) { 
      this.checkoutForm = formBuilder.group({
        title: formBuilder.control('initial value', Validators.required)
      });
    }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', Validators.required],
      pickUp:[false],
      delivery:[true],
      address:['', this.checkoutForm.value.delivery == true ? Validators.required : null],
      city:['', this.checkoutForm.value.delivery == true ? Validators.required : null],
      state:['', this.checkoutForm.value.delivery == true ? Validators.required : null],
      zip:['', this.checkoutForm.value.delivery == true ? Validators.required : null]
    });

    
  }
  onSubmit(){
    this.submitted = true;
    if(this.checkoutForm.valid){
      let order: Order = {
        customerFirstName: this.checkoutForm.value.firstName,
        customerLastName: this.checkoutForm.value.lastName,
        customerPhoneNumber: this.checkoutForm.value.phoneNumber,
        customerEmail: this.checkoutForm.value.email,
        pickUp: this.checkoutForm.value.pickUp,
        subtotal: this.cartService.getSubTotal(), 
        total: this.cartService.getTotalPrice(),
        address: this.checkoutForm.value.pickup ? null : this.checkoutForm.value.address,
        city: this.checkoutForm.value.pickup ? null : this.checkoutForm.value.city,
        state: this.checkoutForm.value.pickup ? null : this.checkoutForm.value.state,
        zip: this.checkoutForm.value.pickup ? null : this.checkoutForm.value.zip,
        products: this.cartService.cartItemList

      }
      console.log(this.checkoutForm.value.state);
      this.apiService.submitOrder(order)
        .then( data => {
              console.log(data);
              this.router.navigate(['']);
          }).catch(function () {
            console.log("Promise Rejected");
          });

      this.cartService.removeAllCart();
    }
  }
  onCheck() {
    this.pickUp = !this.pickUp;
    this.delivery = !this.delivery;
    console.log(this.pickUp);
  }
  onSelect() {
    console.log(this.selected)
  }
  get f() { return this.checkoutForm.controls; }

}
