import { Injectable } from "@angular/core";
import { UserOnClient } from "../model/usermodel/UserOnClient.model";
import { Observable } from "rxjs";
import { UserOnLogin } from "../model/usermodel/UserOnLogin.model";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
  })

export class UserService{
    constructor(
        private http: HttpClient,
    ){

    }
    static saveUserData(user: UserOnClient){
        if(!localStorage.getItem('user')){
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    static getUserLocalData(): UserOnClient{
        let userLocal = JSON.parse(localStorage.getItem('user') ?? "");
        let user = new UserOnClient();
        if(!userLocal){
            return user;
        } 
        user.address = userLocal.address;
        user.district = userLocal.district;
        user.firstname = userLocal.firstname;
        user.lastname = userLocal.lastname;
        user.ward = userLocal.ward;
        return user;
    }

    createNewUser(user: UserOnLogin): Observable<UserOnLogin>{
        return this.http.post<UserOnLogin>("http://localhost:8080/api/users", user);
    }

    getUser(user: UserOnLogin): Observable<UserOnLogin>{
        return this.http.get<UserOnLogin>("http://localhost:8080/api/users?username=" + user.username + "&password=" + user.password);
    }
}