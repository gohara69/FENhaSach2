import { Sach } from '../model/sachmodel/Sach.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SachForCard } from '../model/sachmodel/SachForCard.model';
import { PageSachForCard } from '../model/page/PageSachForCard.model';
import { HttpResponse } from '../model/HttpResponse.model';


@Injectable({
    providedIn: 'root',
  })

export class SachService{
    constructor (
        private http : HttpClient,
    ){}

    getAllPosts(): Observable<Array<Sach>> {
        return this.http.get<Array<Sach>>('http://localhost:8080/api/books');
    }

    getAllBookForCard(): Observable<PageSachForCard> {
        return this.http.get<PageSachForCard>('http://localhost:8080/api/books');
    }

    getAllBookForCardSearchTenSach(name: string, page: number): Observable<PageSachForCard> {
        return this.http.get<PageSachForCard>('http://localhost:8080/api/books?name=' + name + '&page=' + page);
    }

    getAllBookForCardsByPage(page: number): Observable<PageSachForCard> {
        return this.http.get<PageSachForCard>('http://localhost:8080/api/books?page=' + page);
    }

    getAllBookForCardByTheLoaiId(genreId: number, page: number): Observable<PageSachForCard> {
        return this.http.get<PageSachForCard>('http://localhost:8080/api/books/genre/' + genreId + '?page=' + page);
    }

    getAllSachForDetail(): Observable<HttpResponse<Sach[]>>{
        return this.http.get<HttpResponse<Sach[]>>('http://localhost:8000/api/admin/books');
    }

    createSachForDetail(book: Sach): Observable<HttpResponse<Sach>>{
        return this.http.post<HttpResponse<Sach>>('http://localhost:8000/api/admin/books', book);
    }

    updateSachForDetail(book: Sach): Observable<HttpResponse<Sach>>{
        return this.http.put<HttpResponse<Sach>>('http://localhost:8000/api/admin/books', book);
    }
}