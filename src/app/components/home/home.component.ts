import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { environment } from '../../environment/environment';
import { ProductService } from '../../service/product.service';
interface Product {
  id: number;
  name: string;
  price: number;
  thumbnail: string;
  description: string;
  category_id: number;
  url?: string; // URL của ảnh có thể được thêm vào sau khi tải từ API
}
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
          product.url = `${environment.apiBaseUrl}/products/images/${product.thumbnail}`;
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
    });
  }
  onPageChange(page: number){
    debugger;
    this.currentPage = page;
    this.getProducts(this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage:number,totalPages:number):number[]{
    const maxVisiblePages = 5;
    const halfVisiblePages = Math.floor(maxVisiblePages/2);
    
    let startPage = Math.max(currentPage-halfVisiblePages,1);
    let endPage = Math.min(startPage+maxVisiblePages-1,totalPages);

    if(endPage - startPage + 1 < maxVisiblePages){
      startPage = Math.max(endPage- maxVisiblePages+1,1);
    }

    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }

}

