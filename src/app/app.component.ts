import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './service/Admin.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NhaSach';
  isLoginAdmin = AdminService.isLoginAdmin();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.navigate(['/client-home']);
  }
}
