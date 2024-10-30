import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductService{
    private apiGetProducts = `${environment.apiBaseUrl}/products`;

    constructor(private http:HttpClient){ }

    getProducts(page: number , limit:number): Observable<Product[]>{
        const params = new HttpParams()
        .set('page',page.toString())
        .set('limit', limit.toString())
        return this.http.get<Product[]>(this.apiGetProducts,{params});
    }
}