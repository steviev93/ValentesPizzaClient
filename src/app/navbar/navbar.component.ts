import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AuthenticationService } from '../service/authentication';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public totalItem : number = 0;
  public searchTerm !: string;
  public formError: string = '';
  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private cartService : CartService, private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.doLogin();
    }
  }
  private doLogin(): void {
    this.authenticationService.login(this.credentials)
      .then(() => this.router.navigateByUrl('#'))
      .catch((message) => this.formError = message);
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
  onLogout(): void {
    return this.authenticationService.logout();
  }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}