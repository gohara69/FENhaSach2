import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SachForCard } from '../model/sachmodel/SachForCard.model';
import { SachOnCart } from '../model/sachmodel/SachOnCart.model';
import { SachConverter } from '../converter/SachConverter.converter';
@Injectable({
    providedIn: 'root',
  })

export class CartService{
    static addLocalCart(book: SachForCard){
        let cartData: any = [];
        let localCart = localStorage.getItem('cart');
        if(!localCart){
            cartData.push(SachConverter.toSachOnCart(book));
            localStorage.setItem('cart', JSON.stringify(cartData));
        } else {
            cartData = JSON.parse(localCart);
            for(let i = 0 ; i < cartData.length ; i++){
                if(cartData[i].id == book.id){
                    cartData[i].quantity++;
                    localStorage.removeItem('cart');
                    localStorage.setItem('cart', JSON.stringify(cartData));
                    return;
                }
            }
            cartData.push(SachConverter.toSachOnCart(book));
            localStorage.setItem('cart', JSON.stringify(cartData));
        }
    }

    static getCartItemQuantity(): number{
        let localCart = localStorage.getItem('cart');
        if(!localCart)
            return 0;
        let data: any = [];
        data = JSON.parse(localCart);
        let count = 0;
        for(let i = 0 ; i < data.length ; i++){
            count+= data[i].quantity;
        }
        return count;
    }

    static getSachOnLocalCart(){
        let cartData: Array<SachOnCart> = [];
        let localCart = localStorage.getItem('cart');
        if(!localCart){
            return null;
        }
        cartData = JSON.parse(localCart);
        return cartData;
    }

    static removeItem(id: number): void{
        let cartData: Array<SachOnCart> = [];
        let localCart = localStorage.getItem('cart');
        if(!localCart){
            return;
        }
        cartData = JSON.parse(localCart);
        for(let i = 0 ; i < cartData.length ; i++){
            if(cartData[i].id == id){
                cartData.splice(i, 1);
                localStorage.setItem('cart', JSON.stringify(cartData));
            }
        }
    }

    static updateCartItem(item: SachOnCart){
        let cartData: Array<SachOnCart> = [];
        let localCart = localStorage.getItem('cart');
        if(!localCart){
            return;
        }
        cartData = JSON.parse(localCart);
        for(let i = 0 ; i < cartData.length ; i++){
            if(cartData[i].id == item.id){
                cartData[i].quantity = item.quantity;
                localStorage.setItem('cart', JSON.stringify(cartData));
            }
        }
    }

    static sumTotal(): number{
        let cartData: Array<SachOnCart> = [];
        let localCart = localStorage.getItem('cart');
        if(!localCart){
            return 0;
        }
        let sum = 0;
        cartData = JSON.parse(localCart);
        for(let i = 0 ; i < cartData.length ; i++){
            sum+= +cartData[i].giaBan * cartData[i].quantity
        }
        return sum;
    }

    static removeAll(){
        localStorage.removeItem('cart');
    }
}