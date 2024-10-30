import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']  
})
export class DetailProductComponent {

}
