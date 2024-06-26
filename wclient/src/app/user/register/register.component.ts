import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserRole } from '../user-role.enum';
import { User } from '../user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  registerForm!: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      userPassword: new FormControl(null, Validators.required),
      agreeToTerms: new FormControl(false, Validators.requiredTrue),
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const newUser = new User(
        this.registerForm.value.firstName,
        this.registerForm.value.lastName,
        this.registerForm.value.email,
        this.registerForm.value.userPassword,
        UserRole.USER
      );
      const registerUserSub = this.userService.registerUser(newUser).subscribe({
        next: (response) => {
          console.log(response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error(error);
        },
      });
      this.subscriptions.push(registerUserSub);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  onNavigateHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
