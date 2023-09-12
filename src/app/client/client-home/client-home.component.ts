import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { SachForCard } from 'src/app/model/sachmodel/SachForCard.model';
import { CartService } from 'src/app/service/Cart.service';
import { SachService } from 'src/app/service/Sach.service';
import { shareService } from 'src/app/service/share';


@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnChanges{
  books: Array<SachForCard> = [];
  totalPage = 0;
  currentPage = 0;
  @Input() searchText = "";
  @Input() genreId = 0;
  @Output() getItemQuantity: EventEmitter<any> = new EventEmitter();
  itemQuantity = 0;

  constructor(
    private sachService : SachService,
    private shareService : shareService,
    private toast : NgToastService,
    private router : ActivatedRoute,
  ){
    if(this.searchText == ""){
      this.sachService.getAllBookForCardSearchTenSach("", 1).subscribe(page =>{
        if(page.statusCode == 200){
          this.books = page.data.content;
          this.totalPage = page.data.total;
          this.currentPage = page.data.page;
        }
        else {
          this.toast.error({detail:"ERROR",summary:'Something went wrong cannot show books',duration:1500});
        }
      });
    } else {
      this.sachService.getAllBookForCardSearchTenSach(this.searchText, 1).subscribe(page =>{
        this.books = page.data.content;
        this.totalPage = page.data.total;
        this.currentPage = page.data.page;
      });
    }
    this.getItemQuantity.emit(this.itemQuantity);
  }

  async ngOnInit(){
    if(this.router.snapshot.queryParamMap.get('search')){
      console.log(this.router.snapshot.queryParamMap.get('search'));
    }
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

  goToPage(name: string,i: number){
    this.sachService.getAllBookForCardSearchTenSach(name,i).subscribe(page =>{
      this.books = page.data.content;
      this.totalPage = page.data.total;
      this.currentPage = page.data.page;
    });
  }

  showBooksByGenre(genreId: number,i: number){
    this.sachService.getAllBookForCardByTheLoaiId(genreId, i).subscribe(page =>{
      this.books = page.content;
      this.totalPage = page.total;
      this.currentPage = page.page;
    });
  }

  ngOnChanges(change: SimpleChanges){
    for(let p in change){
      if(p == 'searchText'){
        this.goToPage(this.searchText, 1);
      } else if(p == 'genreId'){
        this.showBooksByGenre(this.genreId, 1);
      }
    }
  }

  addToCart(book: SachForCard){
    CartService.addLocalCart(book);
    this.updateQuantity();
    this.shareService.sendNumberData(this.itemQuantity);
  }

  updateQuantity(){
    this.itemQuantity = CartService.getCartItemQuantity();
  }
}
