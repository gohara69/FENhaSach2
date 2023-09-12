import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TheLoai } from 'src/app/model/TheLoai.model';
import { UserOnLogin } from 'src/app/model/usermodel/UserOnLogin.model';
import { TheLoaiService } from 'src/app/service/TheLoai.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { Util } from 'src/app/utils/Util';
import { shareService } from 'src/app/service/share';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent {
  theLoais: Array<TheLoai> = [];
  submited = false;
  genre = new TheLoai();
  user = new UserOnLogin();
  formGenre = new FormGroup({
    nameGenre: new FormControl('', Validators.required)
  });
  constructor(
    private theLoaiService : TheLoaiService,
    private toast : NgToastService,
    private router : Router,
    private shareService : shareService,
  ){
    this.theLoaiService.getAllTheLoais().subscribe(theLoai => {
      this.theLoais = theLoai.data;
    });
    this.user = this.getAdminUser();
  }

  ngOnInit(){
    this.theLoaiService.getAllTheLoais().subscribe(theLoai => {
      this.theLoais = theLoai.data;
    });
  }

  createGenre(){
    this.submited = true;
    if(this.formGenre.valid){
      let genre = new TheLoai();
      genre.tenTheLoai = this.formGenre.get('nameGenre')?.value ?? "";
      this.theLoaiService.createGenre(genre).subscribe(response => {
        ($('#modalCreate') as any).modal('hide');
        if(response.statusCode == 200){
          this.toast.success({detail:"SUCCESS",summary:'Adding genre successfully',duration:5000});
          this.theLoaiService.getAllTheLoais().subscribe(theLoai => {
            this.theLoais = theLoai.data;
            this.shareService.sendStatusData(true);
          });
        } else if(response.statusCode == 500){
          this.toast.error({detail:"ERROR",summary:'Something went wrong cannot add genre',duration:5000});
        }
        this.submited = false;
        this.router.navigateByUrl('admin/genre');
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
    this.theLoaiService.deleteGenre(theLoai.id).subscribe(data => {
      if(data.statusCode == 400){
        this.toast.error({detail:'ERROR', summary:'Genre has books foreign to, cannot be deleted', duration: 1500});
      } else if(data.statusCode == 500){
        this.toast.error({detail:'ERROR', summary:'Genre does not in database', duration: 1500});
      } else if(data.statusCode == 200){
        this.toast.success({detail:"SUCCESS",summary:'Deleting genre successfully',duration:1500});
          this.theLoaiService.getAllTheLoais().subscribe(theLoai => {
            this.theLoais = theLoai.data;
            this.shareService.sendStatusData(true);
          });
      }
    });
  }

  onUpdate(theLoai: TheLoai){
    this.submited = false;
    $('#inputUpdateGenre').val(theLoai.tenTheLoai);
    this.genre = theLoai;
  }

  updateGenre(){
    this.submited = true;
    if(this.formGenre.valid){
      let genre = new TheLoai();
      genre.id = this.genre.id;
      genre.tenTheLoai = this.formGenre.get('nameGenre')?.value ?? "";
      this.theLoaiService.updateGenre(genre).subscribe(response => {
        ($('#modalUpdate') as any).modal('hide');
        if(response.statusCode == 200){
          this.toast.success({detail:"SUCCESS",summary:'Upddating genre successfully',duration:5000});
          this.theLoaiService.getAllTheLoais().subscribe(theLoai => {
            this.theLoais = theLoai.data;
            this.shareService.sendStatusData(true);
          });
        } else if(response.statusCode == 500){
          this.toast.error({detail:"ERROR",summary:'Something went wrong cannot update genre',duration:5000});
        }
        this.submited = false;
        this.router.navigateByUrl('admin/genre');
      });
    }
  }
}
