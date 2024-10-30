import { Routes } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";
import { HttpClient,HTTP_INTERCEPTORS } from '@angular/common/http';

// Định nghĩa routes cho ứng dụng (ban đầu có thể để trống hoặc khai báo các route cụ thể)
export const routes: Routes = [
  // Thêm các route của bạn ở đây
];

// Cấu hình ứng dụng
export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes)]
};
