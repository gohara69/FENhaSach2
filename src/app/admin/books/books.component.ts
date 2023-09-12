import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TheLoai } from 'src/app/model/TheLoai.model';
import { UserOnLogin } from 'src/app/model/usermodel/UserOnLogin.model';
import { TheLoaiService } from 'src/app/service/TheLoai.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { Util } from 'src/app/utils/Util';
import { shareService } from 'src/app/service/share';
import { Sach } from 'src/app/model/sachmodel/Sach.model';
import { SachService } from 'src/app/service/Sach.service';
import { numberPositiveValidator } from 'src/app/validator/number.validator';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  theLoais: TheLoai[] = [];
  books: Sach[] = [];
  submited = false;
  book = new Sach();
  user = new UserOnLogin();
  selectedGenre = 1;
  formBook = new FormGroup({
    nameBook: new FormControl('', Validators.required),
    quantity: new FormControl(0, [Validators.required, numberPositiveValidator()]),
    cost: new FormControl(0, [Validators.required, numberPositiveValidator()]),
    thumbnail: new FormControl(0),
    page: new FormControl(0, [Validators.required, numberPositiveValidator()]),
    genre: new FormControl(1),
  });
  constructor(
    private sachService : SachService,
    private theLoaiService : TheLoaiService,
    private toast : NgToastService,
    private router : Router,
    private shareService : shareService,
  ){
    this.theLoaiService.getAllTheLoais().subscribe(theLoai => {
      this.theLoais = theLoai.data;
    });
    this.sachService.getAllSachForDetail().subscribe(response => {
      this.books = response.data;
    });
    this.user = this.getAdminUser();
    let theLoai = new TheLoai();
    theLoai.id = 1
    this.book.theLoai = theLoai;
  }

  ngOnInit(){
    this.sachService.getAllSachForDetail().subscribe(response => {
      this.books = response.data;
    });
    this.formBook.get('genre')?.valueChanges.subscribe(res =>{
      this.selectedGenre = res ?? 1;
    });
  }

  createBook(){
    this.submited = true;
    if(this.formBook.valid){
      let book = new Sach();
      book.tenSach = this.formBook.get('nameBook')?.value ?? "";
      let theLoai = new TheLoai();
      theLoai.id = this.selectedGenre;
      book.theLoai = theLoai;
      book.soLuong = this.formBook.get('quantity')?.value ?? 0;
      book.giaBan = this.formBook.get('cost')?.value ?? 0;
      book.thumbnail = ($('#inputFile') as any)[0].files[0].name;
      book.soTrang = this.formBook.get('page')?.value ?? 0;
      this.sachService.createSachForDetail(book).subscribe(response => {
        ($('#modalCreate') as any).modal('hide');
        if(response.statusCode == 200){
          this.toast.success({detail:"SUCCESS",summary:'Adding book successfully',duration:1500});
          this.sachService.getAllSachForDetail().subscribe(sachs => {
            this.books = sachs.data;
            this.shareService.sendStatusData(true);
          });
        } else if(response.statusCode == 500){
          this.toast.error({detail:"ERROR",summary:'Something went wrong cannot add book',duration:1500});
        }
        this.submited = false;
        this.router.navigateByUrl('admin/books');
      });
    }
  }

  getAdminUser(): UserOnLogin{
    let local = localStorage.getItem('userLogin');
    if(local){
      return JSON.parse(local);
    }
    return new UserOnLogin();
  }

  onDelete(theLoai: TheLoai){
    // this.theLoaiService.deleteGenre(theLoai.id).subscribe(data => {
    //   if(data.status == 400){
    //     this.toast.error({detail:'ERROR', summary:'Genre has books foreign to, cannot be deleted', duration: 1500});
    //   } else if(data.status == 500){
    //     this.toast.error({detail:'ERROR', summary:'Genre does not in database', duration: 1500});
    //   } else if(data.status == 200){
    //     this.toast.success({detail:"SUCCESS",summary:'Deleting genre successfully',duration:1500});
    //       this.theLoaiService.getAllTheLoais().subscribe(theLoai => {
    //         this.theLoais = theLoai.data;
    //         this.shareService.sendStatusData(true);
    //       });
    //   }
    // });
  }

  onUpdate(book: Sach){
    this.submited = false;
    $('#selectGenre').val(book.theLoai.id);
    this.book = book;
  }

  updateBook(){
    this.submited = true;
    if(this.formBook.valid){
      let book = new Sach();
      book.id = this.book.id;
      book.tenSach = this.formBook.get('nameBook')?.value ?? "";
      let theLoai = new TheLoai();
      theLoai.id = this.selectedGenre;
      book.theLoai = theLoai;
      book.soLuong = this.formBook.get('quantity')?.value ?? 0;
      book.giaBan = this.formBook.get('cost')?.value ?? 0;
      book.thumbnail = ($('#inputFileUpdate') as any)[0].files[0].name;
      book.soTrang = this.formBook.get('page')?.value ?? 0;
      console.log(book);
      // this.sachService.createSachForDetail(book).subscribe(response => {
      //   ($('#modalCreate') as any).modal('hide');
      //   if(response.status == 200){
      //     this.toast.success({detail:"SUCCESS",summary:'Updating book successfully',duration:1500});
      //     this.sachService.getAllSachForDetail().subscribe(sachs => {
      //       this.books = sachs.data;
      //       this.shareService.sendStatusData(true);
      //     });
      //   } else if(response.status == 500){
      //     this.toast.error({detail:"ERROR",summary:'Something went wrong cannot update book',duration:1500});
      //   }
      //   this.submited = false;
      //   this.router.navigateByUrl('admin/books');
      // });
    }
  }
}
