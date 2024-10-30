import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'; // Thêm icon faEye
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginDTO } from '../../dtos/user/login.dto';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginResponse } from '../../responses/user/login.response';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FontAwesomeModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  @ViewChild('loginForm', { static: false }) registerForm!: NgForm;
  phone: string = '';
  password: string = '';
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  rememberMe: boolean = false;

  showPassword = false;  // Trạng thái hiển thị mật khẩu

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;  // Đổi trạng thái hiển thị mật khẩu
  }

  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`);
  }
  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService

  ) {

  }

  login() {
    const message = `phone:${this.phone}` +
      `password:${this.password}`;
    debugger

    const loginDTO: LoginDTO = {

      "phone_number": this.phone,
      "password": this.password,

    }

    this.userService.login(loginDTO).subscribe(
      {
        next: (response: LoginResponse) => {
          debugger
          const { token } = response;
          this.tokenService.setToken(token);
          this.rememberMeFunction(token);
          this.router.navigate(['/home']);
        },
        complete: () => {
          debugger
          console.log('Registration process complete');
        },
        error: (error: any) => {
          debugger
          console.error('Sign up not successfully', error);
        }
      }
    )
  }
  rememberMeFunction(token: string) {
    if (this.rememberMe) {
      localStorage.setItem('authToken', token);  // Ghi nhớ token trong localStorage
    } else {
      sessionStorage.setItem('authToken', token);  // Ghi nhớ token trong sessionStorage
    }
  }
  ngOnInit() {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    if (token) {
      this.router.navigate(['/home']);
    }
  }
  
}
