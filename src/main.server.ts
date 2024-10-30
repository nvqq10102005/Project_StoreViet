// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { config } from './app/app.config.server';

// const bootstrap = () => bootstrapApplication(AppComponent, config);
//export default bootstrap;

import { bootstrapApplication } from '@angular/platform-browser';
//import { HomeComponent } from './app/home/home.component'; // Đảm bảo đường dẫn chính xác
import { config } from './app/app.config.server'; // Nếu bạn có cấu hình cần thiết
//import { OrderComponent } from './app/order/order.component';
//import { OrderConfirmComponent } from './app/order-confirm/order-confirm.component';
import { LoginComponent } from './app/components/login/login.component';
import { RegisterComponent } from './app/components/register/register.component';
import { DetailProductComponent } from './app/components/detail-product/detail-product.component';
import { HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './app/components/home/home.component';

const bootstrap = () => bootstrapApplication(HomeComponent, config); // Bootstrap HomeComponent
export default bootstrap;
// import { bootstrapApplication } from '@angular/platform-browser';
// import { HomeComponent } from './app/home/home.component';
// bootstrapApplication(HomeComponent)
//   .catch(err => console.error(err));
