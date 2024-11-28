import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import { HomeComponent } from '../components/home/home.component';
interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  category_id: number;
  url?: string; // URL của ảnh sản phẩm có thể thêm sau khi tải từ API
}
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