import { Component } from '@angular/core';
import { AdminService } from '../service/Admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  //isLogin = AdminService.isLoginAdmin();
  isLogin = true;
  constructor(){
  }
}
