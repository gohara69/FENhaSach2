import { Sach } from '../model/sachmodel/Sach.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TheLoai } from '../model/TheLoai.model';
import { HttpResponse } from '../model/HttpResponse.model';

@Injectable({
    providedIn: 'root',
  })

export class TheLoaiService{
    constructor (
        private http : HttpClient,
    ){}

    getAllTheLoais(): Observable<HttpResponse<TheLoai[]>> {
        return this.http.get<HttpResponse<TheLoai[]>>('http://localhost:5052/api/TheLoais');
    }
   
    createGenre(genre : TheLoai): Observable<HttpResponse<TheLoai>> {
        return this.http.post<HttpResponse<TheLoai>>('http://localhost:8000/api/admin/theloais', genre);
    }

    deleteGenre(id : number): Observable<HttpResponse<Array<TheLoai>>> {
        return this.http.delete<HttpResponse<Array<TheLoai>>>('http://localhost:8000/api/admin/theloais/' + id);
    }

    updateGenre(genre : TheLoai): Observable<HttpResponse<TheLoai>> {
        return this.http.put<HttpResponse<TheLoai>>('http://localhost:8000/api/admin/theloais/' + genre.id, genre);
    }
}