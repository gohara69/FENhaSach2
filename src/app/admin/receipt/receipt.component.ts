import { Component } from '@angular/core';
import { Receipt } from 'src/app/model/receipt/Receipt.model';
import { ReceiptService } from 'src/app/service/Receipt.service';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.scss']
})
export class ReceiptComponent {
  receipts: Array<Receipt> = [];
  page = 1;
  totalPages = 1;

  constructor(
    private receiptService : ReceiptService,
  ){
    this.receiptService.getAllPageReceipt().subscribe(data => {
      this.receipts = data.content;
      this.page = data.pageable.pageNumber;
      this.totalPages = data.totalPages;
    });
  }

  fakeArray(length: number): Array<number> {
    if (length >= 0) {
      var arr = new Array();
      for(let i = 0 ; i < length ; i++){
        arr.push(i);
      }
      return arr;
    }
    return new Array(0);
  }

  goToPage(i: number){
    this.receiptService.getAllPageReceiptByPage(i).subscribe(data => {
      this.receipts = data.content;
      this.page = data.pageable.pageNumber;
      this.totalPages = data.totalPages;
    });
  }
}
