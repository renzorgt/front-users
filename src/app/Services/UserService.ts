import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import configurl from '../../assets/config/config.json'
import { User } from '../Models/User';
import { Login } from '../Models/Login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = configurl.apiServer.url + '/api/product/';
  constructor(private http: HttpClient) { }
  getProductList(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'UserList');
  }
  postProductData(productData: User): Observable<User> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<User>(this.url + 'Createuser', productData, httpHeaders);
  }
  updateProduct(product: User): Observable<User> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<User>(this.url + 'UpdateUser?id=' + product.Id, product, httpHeaders);
  }
  deleteProductById(id: number): Observable<number> {
    return this.http.post<number>(this.url + 'DeleteUser?id=' + id, null);
  }
  getProductDetailsById(id: string): Observable<User> {
    return this.http.get<User>(this.url + 'UserDetail?id=' + id);
  }

  getLogin(): Observable<Login[]> {
    return this.http.get<Login[]>(this.url + 'LoginList');
  }
}