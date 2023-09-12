import { Location } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SachForCard } from 'src/app/model/sachmodel/SachForCard.model';
import { CartService } from 'src/app/service/Cart.service';
import { SachService } from 'src/app/service/Sach.service';
import { shareService } from 'src/app/service/share';

@Component({
  selector: 'app-client-genre',
  templateUrl: './client-genre.component.html',
  styleUrls: ['./client-genre.component.scss']
})

export class ClientGenreComponent{
  books: Array<SachForCard> = [];
  totalPage = 0;
  currentPage = 0;
  itemQuantity = 0;
  searchText = ""
  genreId = 1;

  constructor(
    private sachService : SachService,
    private router : ActivatedRoute,
    private shareService : shareService,
  ){
    this.genreId = (Number)(this.router.snapshot.paramMap.get('id')) ?? 1;
    this.showBooksByGenre(this.genreId, 1);
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
       let id = +params['id']; 
       this.showBooksByGenre(id, 1);
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

  goToPage(name: string,i: number){
    if(name == ""){
      this.sachService.getAllBookForCardsByPage(i).subscribe(page =>{
        this.books = page.content;
        this.totalPage = page.total;
        this.currentPage = page.page;
      });
    } else {
      this.sachService.getAllBookForCardSearchTenSach(name, i).subscribe(page =>{
        this.books = page.data.content;
        this.totalPage = page.data.total;
        this.currentPage = page.data.page;
      });
    }
  }

  showBooksByGenre(genreId: number,i: number){
    this.sachService.getAllBookForCardByTheLoaiId(genreId, i).subscribe(page =>{
      this.books = page.content;
      this.totalPage = page.total;
      this.currentPage = page.page;
    });
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
