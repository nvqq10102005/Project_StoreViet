import { Component, ViewChild } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { UserService } from '../../service/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, FontAwesomeModule, FormsModule, CommonModule,NgIf],  // HttpClientModule added
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm', { static: false }) registerForm!: NgForm;
  faEyeSlash = faEyeSlash;
  faEye = faEye;

  showPassword = false;
  showConfirmPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  phone: string = '';
  password: string = '';
  retypePassword: string = '';
  fullname: string = '';
  dateOfBirth: Date = new Date();
  address: string = '';
  isAccepted: boolean = false;

  constructor(private UserService : UserService , private router: Router) {
    this.phone='';
    this.password='';
    this.retypePassword='';
    this.fullname='';
    this.address='';
    this.isAccepted=false;
    this.dateOfBirth = new Date();
    this.dateOfBirth.setFullYear(this.dateOfBirth.getFullYear()-18);
  }

  onPhoneChange() {
    console.log(`Phone typed: ${this.phone}`);
  }

  register() {
    if (this.registerForm?.form?.valid && this.checkPasswordsMatch()) {  // Ensure passwords match
      const message = `phone: ${this.phone}\npassword: ${this.password}`;
      alert('You pressed register\n' + message);
      debugger

      const RegisterDTO : RegisterDTO = {
        "fullname": this.fullname,
        "phone_number": this.phone,
        "address": this.address,
        "password": this.password,
        "retype_password": this.retypePassword,
        "date_of_birth": this.dateOfBirth,
        "facebook_account_id": 0, 
        "google_account_id": 0,
        "role_id": 1
      } 
 
      this.UserService.register(RegisterDTO).subscribe(
        {
          next: (response: any) => {
            debugger
              this.router.navigate(['/login']);         
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
    } else {
      alert('Form is invalid or passwords do not match');
    }
  }
//   checkPasswordsMatch() {
//     if (this.password !== this.retypePassword) {
//         this.registerForm.controls['retypePassword'].setErrors({ passwordMismatch: true });
//     } else {
//         this.registerForm.controls['retypePassword'].setErrors(null);
//     }
// }
checkPasswordsMatch(): boolean {
  const isMatch = this.password === this.retypePassword;
  if (!isMatch) {
    // Set lỗi cho trường retypePassword nếu mật khẩu không khớp
    this.registerForm.controls['retypePassword'].setErrors({ passwordMismatch: true });
  } else {
    this.registerForm.controls['retypePassword'].setErrors(null);
  }
  return isMatch; // Trả về true hoặc false dựa vào sự khớp mật khẩu
}
}
