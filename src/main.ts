import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { HomeComponent } from './app/components/home/home.component';
//import { OrderComponent } from './app/order/order.component';
//import { OrderConfirmComponent } from './app/order-confirm/order-confirm.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
import { HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './app/interceptors/token.interceptors';

bootstrapApplication(HomeComponent, {
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi: true,
  }]
}).catch((err) => console.error(err));
