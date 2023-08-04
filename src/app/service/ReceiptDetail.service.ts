import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceiptDetail } from '../model/receiptDetail/receiptDetail';
@Injectable({
    providedIn: 'root',
  })

export class ReceiptDetailService{
    constructor (
        private http : HttpClient,
    ){}

    createReceipt(receiptDetail : ReceiptDetail): Observable<ReceiptDetail> {
        return this.http.post<ReceiptDetail>('http://localhost:8080/api/receiptdetails', receiptDetail);
    }

    createReceiptInLocal(receiptId : number){
        let storage = localStorage.getItem('cart');
        if(!storage){
            return;
        }
        let cartItem = JSON.parse(storage);
        for(let i = 0 ; i < cartItem.length ; i++){
            let receiptDetail = new ReceiptDetail();
            receiptDetail.itemId = cartItem[i].id;
            receiptDetail.receiptId = receiptId;
            receiptDetail.quantity = cartItem[i].quantity;
            this.createReceipt(receiptDetail).subscribe(data => {});
        }
        localStorage.removeItem('cart');
    }
}