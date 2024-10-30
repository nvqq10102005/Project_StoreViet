import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { response } from 'express';
import { environment } from '../../environment/environment';
import { error } from 'console';
 @Component({
   selector: 'app-home',
   standalone: true,
   imports: [FooterComponent, HeaderComponent],
   templateUrl: './home.component.html',
   styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[]=[];

  constructor(private productService: ProductService){}

  ngOnInit(){
    this.getProducts(this.currentPage,this.itemsPerPage)
  }

  getProducts(page:number, limit:number){
    this.productService.getProducts(page,limit).subscribe({
      next: (response: any) => {
        debugger
        response.product.forEach((product : Product) =>{
          product.url = `${environment.apiBaseUrl}/products/images${product.thumbnail}`;
        });
        this.products = response.products;
        this.totalPages = response.totalPages;
        this.visiblePages = this.generateVisiblePageArray(this.currentPage,this.totalPages);
      },
      complete:() => {
        debugger;
      },
      error:(error:any) => {
        debugger;
        console.error('Error fetching products',error);
      }
    })
  }
}

