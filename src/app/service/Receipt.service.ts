import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receipt } from '../model/receipt/Receipt.model';
import { PageReceipt } from '../model/receipt/PageReceipt.model';
@Injectable({
    providedIn: 'root',
  })

export class ReceiptService{
    constructor (
        private http : HttpClient,
    ){}

    createReceipt(receipt : Receipt): Observable<Receipt> {
        return this.http.post<Receipt>('http://localhost:8080/api/receipts', receipt);
    }

    getAllPageReceipt(): Observable<PageReceipt>{
        return this.http.get<PageReceipt>('http://localhost:8080/api/receipts');
    }

    getAllPageReceiptByPage(page: number): Observable<PageReceipt>{
        return this.http.get<PageReceipt>('http://localhost:8080/api/receipts?page=' + page);
    }
}