import { Component, Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SachOnCart } from 'src/app/model/sachmodel/SachOnCart.model';
import { CartService } from 'src/app/service/Cart.service';
import { shareService } from 'src/app/service/share';

declare function subTotal(): any;
declare function clearCartJs(): any;
@Component({
  selector: 'app-client-cart',
  templateUrl: './client-cart.component.html',
  styleUrls: ['./client-cart.component.scss']
})
export class ClientCartComponent implements OnInit{
  books: Array<SachOnCart> = [];
  sumTotal = +CartService.sumTotal().toFixed(2);

  constructor(
    private router : Router,
    private route : ActivatedRoute,
    private shareService : shareService,
  ){
    this.books = CartService.getSachOnLocalCart() ?? [];
  }

  ngOnInit(): void {
    this.books = CartService.getSachOnLocalCart() ?? [];
  }

  removeItem(book: SachOnCart){
    CartService.removeItem(book.id);
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.shareService.sendNumberData(CartService.getCartItemQuantity());
    this.router.navigate(['./'], {
      relativeTo: this.route,
    })
  }

  updateHeader(){
    let listQuantity = document.getElementsByClassName('item-quantity');
    for(let i = 0 ; i< listQuantity.length ; i++){
      let quantityItem = +(listQuantity[i] as HTMLInputElement)?.value ?? 0;
      if(quantityItem != this.books[i].quantity){
        this.books[i].quantity = quantityItem;
        CartService.updateCartItem(this.books[i]);
        this.shareService.sendNumberData(CartService.getCartItemQuantity());
      }
    }
  }

  clearCart(){
    CartService.removeAll();
    this.books = CartService.getSachOnLocalCart() ?? [];
    this.shareService.sendNumberData(CartService.getCartItemQuantity());
    this.router.navigate(['./'], {
      relativeTo: this.route,
    })
  }
}
