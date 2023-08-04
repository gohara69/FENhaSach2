import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
   providedIn: 'root',
 })
export class shareService {
   private subject = new Subject<any>();

   getClickEvent(): Observable<any>{
      return this.subject.asObservable();
   }

   sendNumberData(page: number) {
      this.subject.next(page);
   }

   sendStatusData(status: boolean){
      this.subject.next(status);
   }

   getData(): Observable<any> {
      return this.subject.asObservable();
   }
}