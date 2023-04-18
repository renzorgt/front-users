import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Models/User';
import { FormBuilder, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../Services/UserService';
@Component({
  selector: 'app-login-crud',
  templateUrl: './login-crud.component.html',
  styleUrls: ['./login-crud.component.css']
})
export class LoginCrudComponent implements OnInit {
  UserList?: Observable<User[]>;
  UserList1?: Observable<User[]>;
  UserForm: any;
  massage = "";
  prodCategory = "";
  productId = 0;
  constructor(private formbulider: FormBuilder,
     private userService: UserService,private router: Router,
     private jwtHelper : JwtHelperService,private toastr: ToastrService) { }

  ngOnInit() {
    this.prodCategory = "0";
    this.UserForm = this.formbulider.group({
      Nameuser: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Nombre: ['', [Validators.required]],
      Identificacion: ['', [Validators.required]],
      estado: ['', [Validators.required]],
    });
    this.getProductList();
  }
  getProductList() {
    this.UserList1 = this.userService.getProductList();
    this.UserList = this.UserList1;
  }
  PostProduct(user: User) {
    const product_Master = this.UserForm.value;
    this.userService.postProductData(product_Master).subscribe(
      () => {
        this.getProductList();
        this.UserForm.reset();
        this.toastr.success('Data Saved Successfully');
      }
    );
  }
  ProductDetailsToEdit(id: string) {
    this.userService.getProductDetailsById(id).subscribe(userResult => {
      this.productId = userResult.Id;
      this.UserForm.controls['Nameuser'].setValue(userResult.Nameuser);
      this.UserForm.controls['Password'].setValue(userResult.Password);
      this.UserForm.controls['Nombre'].setValue(userResult.Name);
      this.UserForm.controls['Identificacion'].setValue(userResult.Indentification);
      this.UserForm.controls['estado'].setValue(userResult.estado);

    });
  }
  UpdateProduct(user: User) {
    user.Id = this.productId;
    const product_Master = this.UserForm.value;
    this.userService.updateProduct(product_Master).subscribe(() => {
      this.toastr.success('Data Updated Successfully');
      this.UserForm.reset();
      this.getProductList();
    });
  }

  DeleteProduct(id: number) {
    if (confirm('Do you want to delete this product?')) {
      this.userService.deleteProductById(id).subscribe(() => {
        this.toastr.success('Data Deleted Successfully');
        this.getProductList();
      });
    }
  }

  Clear(user: User){
    this.UserForm.reset();
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}
