import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, FormGroupDirective, Validators } from '@angular/forms';
import { Receipt } from '../../model/receipt/Receipt.model';
import { SachOnCart } from 'src/app/model/sachmodel/SachOnCart.model';
import { UserOnClient } from 'src/app/model/usermodel/UserOnClient.model';
import { CartService } from 'src/app/service/Cart.service';
import { ReceiptService } from 'src/app/service/Receipt.service';
import { UserService } from 'src/app/service/User.service';
import { ReceiptDetail } from 'src/app/model/receiptDetail/receiptDetail';
import { ReceiptDetailService } from 'src/app/service/ReceiptDetail.service';
import { shareService } from 'src/app/service/share';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-checkout',
  templateUrl: './client-checkout.component.html',
  styleUrls: ['./client-checkout.component.scss']
})
export class ClientCheckoutComponent {
  submitedUserForm = false;
  submitedPaymentForm = false;
  userOnLocal: UserOnClient = new UserOnClient();
  books: Array<SachOnCart> = [];
  sumTotal = +(CartService.sumTotal().toFixed(2));
  anonymousId = 1;
  userForm = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    ward: new FormControl("", Validators.required),
    district: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    remember: new FormControl(true),
  });

  paymentForm = new FormGroup({
    cardnumber: new FormControl("", Validators.required),
    expiration: new FormControl("", Validators.required),
    cvv: new FormControl("", Validators.required),
  });

  constructor(
    private receiptService : ReceiptService,
    private receiptDetailService : ReceiptDetailService,
    private shareService : shareService,
    private router : Router
  ){
    if(localStorage.getItem('user')){
      this.userOnLocal = UserService.getUserLocalData();
    }
    if(this.userOnLocal.address != ""){
      this.userForm.get('address')?.setValue(this.userOnLocal.address);
      this.userForm.get('district')?.setValue(this.userOnLocal.district);
      this.userForm.get('firstname')?.setValue(this.userOnLocal.firstname);
      this.userForm.get('lastname')?.setValue(this.userOnLocal.lastname);
      this.userForm.get('ward')?.setValue(this.userOnLocal.ward);
    }
    this.books = CartService.getSachOnLocalCart() ?? [];
  }

  submitUserInfo(){
    localStorage.removeItem('user');
    this.submitedUserForm = true;
    if(this.userForm.valid){
      if(this.userForm.get('remember')?.value){
        let user = new UserOnClient();
        user.firstname = this.userForm.get('firstname')?.value ?? "";
        user.lastname = this.userForm.get('lastname')?.value ?? "";
        user.ward = this.userForm.get('ward')?.value ?? "";
        user.district = this.userForm.get('district')?.value ?? "";
        user.address = this.userForm.get('address')?.value ?? "";
        UserService.saveUserData(user);
      }
    }
  }

  onSubmitPaymentForm(){
    this.submitedPaymentForm = true;
  }

  placeOrder(){
    if(!localStorage.getItem('userlogin')){
      let receipt = new Receipt();
      receipt.address = this.userForm.get('address')?.value ?? "";
      receipt.district = this.userForm.get('district')?.value ?? "";
      receipt.firstname = this.userForm.get('firstname')?.value ?? "";
      receipt.lastname = this.userForm.get('lastname')?.value ?? "";
      receipt.status = true;
      receipt.userid = this.anonymousId;
      receipt.total = this.sumTotal;
      receipt.ward = this.userForm.get('address')?.value ?? "";
      this.receiptService.createReceipt(receipt).subscribe(receipt =>{
        this.receiptDetailService.createReceiptInLocal(receipt.id);
        this.shareService.sendNumberData(CartService.getCartItemQuantity());
        this.router.navigateByUrl('/client-success');
      });
    }
  }
}
